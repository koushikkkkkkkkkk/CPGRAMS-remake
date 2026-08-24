import { createClient } from '@supabase/supabase-js';

// ============================================================================
// 1. Initialize the Client
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn("Supabase environment variables are missing. Please check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// Types
// ============================================================================

export type ProfileData = {
  full_name: string;
  phone_number: string;
  state_code: string;
};

export type GrievancePayload = {
  description: string;
  category?: string;
  location?: string;
  evidence_url?: string;
};

export type GrievanceRecord = {
  id: string; // UUID from Supabase
  tracking_id: string; // CPG-XXXXXXXX
  user_id: string | null;
  description: string;
  is_anonymous: boolean;
  status: string;
  assigned_department: string | null;
};

// ============================================================================
// 2. Sign Up / Profile Sync
// ============================================================================

/**
 * Registers a new user with Supabase Auth and creates a matching profile record.
 * 
 * @param email - User's email
 * @param password - User's password
 * @param profile - Additional user details (name, phone, state)
 * @returns The created user object or throws an error
 */
export async function signUpUser(email: string, password: string, profile: ProfileData) {
  // 1. Sign up the user via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("User creation failed: No user returned");

  // 2. Create the matching row in the 'profiles' table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id, // Foreign key to auth.users
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        state_code: profile.state_code,
      }
    ]);

  if (profileError) {
    // Note: In a robust production environment, you might want a rollback or retry mechanism here
    console.error("Failed to create profile:", profileError);
    throw profileError;
  }

  return authData.user;
}

// ============================================================================
// 3. Grievance Submission Handler
// ============================================================================

/**
 * Generates a secure, random tracking hash string formatted as 'CPG-XXXXXXXX'.
 */
function generateTrackingHash(): string {
  // Generates 8 random uppercase alphanumeric characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let hash = '';
  for (let i = 0; i < 8; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CPG-${hash}`;
}

/**
 * Submits a new grievance to the database and generates a unique tracking ID.
 * 
 * @param payload - Grievance details (description, category, etc.)
 * @param isAnonymous - Boolean determining if user_id should be masked via RLS
 * @returns The generated tracking ID
 */
export async function submitGrievance(payload: GrievancePayload, isAnonymous: boolean = false) {
  // Get the current session user if they exist
  const { data: { user } } = await supabase.auth.getUser();
  
  const trackingId = generateTrackingHash();

  const { error } = await supabase
    .from('grievances')
    .insert([
      {
        tracking_id: trackingId,
        user_id: user ? user.id : null,
        description: payload.description,
        category: payload.category || 'General',
        location: payload.location || null,
        evidence_url: payload.evidence_url || null,
        is_anonymous: isAnonymous,
        status: 'RECEIVED', // Initial status
      }
    ]);

  if (error) throw error;

  // Return the tracking ID so the frontend can display it to the user
  return trackingId;
}

// ============================================================================
// 4. Public Status Tracker Lookup
// ============================================================================

/**
 * Queries the public 'tracked_grievances' view using a tracking hash.
 * 
 * @param trackingId - The CPG-XXXXXXXX tracking string
 * @returns The status and assigned department, or null if not found
 */
export async function getGrievanceStatus(trackingId: string) {
  const { data, error } = await supabase
    .from('tracked_grievances')
    .select('status, assigned_department, tracking_id')
    .eq('tracking_id', trackingId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Postgres error code for "Row not found"
      return null;
    }
    throw error;
  }

  return data;
}
