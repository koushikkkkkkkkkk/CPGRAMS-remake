"use client";

import { supabase } from "./supabase";
import type { AppLanguage } from "./i18n";

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

/** Writes a grievance using the browser-safe Supabase publishable key and RLS policy. */
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
