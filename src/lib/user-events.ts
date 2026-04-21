// Persistencia local de eventos creados por usuarios (Fase 1).
// En Fase 2 se moverá a una tabla `events` en Lovable Cloud.
import type { AppEvent } from "./events-data";

const STORAGE_KEY = "enterate.user_events.v1";

export function getUserEvents(): AppEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AppEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserEvent(event: AppEvent): void {
  if (typeof window === "undefined") return;
  const all = getUserEvents();
  const next = [event, ...all.filter((e) => e.id !== event.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getUserEventsByCreator(userId: string): AppEvent[] {
  return getUserEvents().filter((e) => e.createdBy === userId);
}

export function findUserEvent(idOrSlug: string): AppEvent | undefined {
  return getUserEvents().find((e) => e.id === idOrSlug || e.slug === idOrSlug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || `evento-${Date.now()}`;
}
