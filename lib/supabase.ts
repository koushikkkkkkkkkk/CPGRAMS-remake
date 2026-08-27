import { createClient } from '@supabase/supabase-js';
import type { AppLanguage } from "./i18n";

// ============================================================================
// 1. Initialize the Client
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
// Supabase renamed the browser-safe "anon" key to a publishable key. Support
// both names so existing deployments continue to work while new projects use
// the current variable name.
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-key';

if (supabaseUrl === 'https://placeholder.supabase.co' || supabasePublishableKey === 'placeholder-key') {
  console.warn("Supabase environment variables are missing. Please check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// ============================================================================
// Types
// ============================================================================

export type ProfileData = {
  full_name: string;
  phone_number: string;
  state_code: string;
};

export type GrievanceSubmission = {
  title: string;
  description: string;
  assignedDepartment: string;
  isIdentityMasked: boolean;
  language: AppLanguage;
  urgencyLevel?: string;
  tags?: string[];
  englishTranslation?: string;
};

export type GrievanceRecord = {
  id: string; // UUID from Supabase
  tracking_hash: string; // CPG-XXXXXXXX
  user_id: string | null;
  description: string;
  is_anonymous: boolean;
  status: string;
  assigned_department: string | null;
  category: string;
  detected_language: string;
  urgency_level: string;
  tags: any;
  english_translation: string;
  title: string;
};

// ============================================================================
// 2. Sign Up / Profile Sync
// ============================================================================

export async function signUpUser(email: string, password: string, profile: ProfileData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("User creation failed: No user returned");

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        state_code: profile.state_code,
      }
    ]);

  if (profileError) {
    console.error("Failed to create profile:", profileError);
    throw profileError;
  }

  return authData.user;
}

// ============================================================================
// 3. Grievance Submission Handler (New AI Pipeline)
// ============================================================================

const bytesToHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

async function createMaskedTrackingHash(): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(32));
  const payload = `${Date.now()}:${bytesToHex(salt.buffer)}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
  return `CPG-${bytesToHex(digest).slice(0, 24).toUpperCase()}`;
}

function createStandardTrackingHash(): string {
  const random = crypto.getRandomValues(new Uint32Array(2));
  return `CPG-${Array.from(random, (value) => value.toString(36).toUpperCase()).join("")}`;
}

export async function submitMaskedGrievance(input: GrievanceSubmission): Promise<string> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError && !input.isIdentityMasked) throw authError;
  if (!input.isIdentityMasked && !user) throw new Error("Sign in or enable identity masking before submitting.");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const trackingHash = input.isIdentityMasked
      ? await createMaskedTrackingHash()
      : createStandardTrackingHash();
      
    const { error } = await supabase.from("grievances").insert({
      tracking_hash: trackingHash,
      title: input.title.trim() || "Untitled Grievance",
      description: input.description.trim(),
      category: input.assignedDepartment || "General",
      assigned_department: input.assignedDepartment || "General Grievance Cell",
      status: "RECEIVED",
      is_anonymous: input.isIdentityMasked,
      user_id: input.isIdentityMasked ? null : user?.id ?? null,
      detected_language: input.language === "ta" ? "tm" : (input.language || "en"),
      urgency_level: input.urgencyLevel || "Medium",
      tags: input.tags ? JSON.stringify(input.tags) : null,
      english_translation: input.englishTranslation || input.description.trim()
    });

    if (!error) return trackingHash;
    if (error.code !== "23505") throw error;
  }

  throw new Error("Could not reserve a unique tracking hash. Please try again.");
}

// ============================================================================
// 4. Public Status Tracker Lookup
// ============================================================================

export async function getGrievanceStatus(trackingId: string): Promise<any> {
  const response = await supabase
    .from('grievances')
    .select('tracking_hash, status, assigned_department, urgency_level, tags, english_translation, title, description')
    .eq('tracking_hash', trackingId)
    .maybeSingle();

  let data: any = response.data;

  if (response.error || !data) {
    const fallback = await supabase
      .rpc('get_grievance_by_tracking_hash', { lookup_hash: trackingId })
      .maybeSingle();
    
    if (fallback.error) throw fallback.error;
    data = fallback.data;
  }

  if (data && data.tracking_hash) {
    data.tracking_id = data.tracking_hash;
  }

  return data;
}
