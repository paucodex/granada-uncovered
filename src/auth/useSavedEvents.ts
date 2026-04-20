import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";

export function useSavedEvents() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setSavedIds(new Set());
      return;
    }
    supabase
      .from("saved_events")
      .select("event_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setSavedIds(new Set(data.map((r) => r.event_id)));
      });
  }, [user]);

  const toggleSave = async (eventId: string): Promise<boolean> => {
    if (!user) return false;
    if (savedIds.has(eventId)) {
      const { error } = await supabase
        .from("saved_events")
        .delete()
        .eq("user_id", user.id)
        .eq("event_id", eventId);
      if (!error) {
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(eventId);
          return next;
        });
        toast("Quitado de guardados");
      }
    } else {
      const { error } = await supabase
        .from("saved_events")
        .insert({ user_id: user.id, event_id: eventId });
      if (!error) {
        setSavedIds((prev) => new Set(prev).add(eventId));
        toast("Guardado ✓");
      }
    }
    return true;
  };

  return { savedIds, toggleSave, isSaved: (id: string) => savedIds.has(id) };
}
