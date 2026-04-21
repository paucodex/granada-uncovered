import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

// Simple pub/sub so any component using the profile refreshes after an update.
const listeners = new Set<() => void>();
export function notifyProfileChanged() {
  for (const fn of listeners) fn();
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, user_id, display_name, username, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle();
    setProfile(data ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
    const fn = () => fetchProfile();
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, [fetchProfile]);

  return { profile, loading, refresh: fetchProfile };
}

/** Best display label, never falls back to email-based aliases if a real name exists. */
export function profileLabel(
  profile: Profile | null,
  fallbackEmail?: string | null,
): string {
  if (profile?.display_name && profile.display_name.trim()) return profile.display_name.trim();
  if (profile?.username && profile.username.trim()) return profile.username.trim();
  if (fallbackEmail) return fallbackEmail.split("@")[0];
  return "Tú";
}
