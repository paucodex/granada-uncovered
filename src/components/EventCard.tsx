import { MapPin, Clock, Users, Bookmark } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";
import { useSavedEvents } from "@/auth/useSavedEvents";
import { toast } from "sonner";
import type { AppEvent, Vibe } from "@/lib/events-data";
import { vibeMeta } from "@/lib/events-data";

// Re-exports para compatibilidad con código existente
export type EventCategory = Vibe;
export type EventItem = AppEvent;

function pillStyle(vibe: Vibe): React.CSSProperties {
  const meta = vibeMeta(vibe);
  // Fondo con color de marca, texto adaptado
  const dark: Vibe[] = ["Mercadillos", "Gratis", "Artesanía", "Humor"];
  return {
    backgroundColor: `var(--brand-${vibeColorKey(vibe)})`,
    color: dark.includes(vibe) ? "var(--foreground)" : "white",
  } as React.CSSProperties;
}

function vibeColorKey(vibe: Vibe): string {
  switch (vibe) {
    case "Cultura":
    case "Friki":
      return "purple";
    case "Mercadillos":
    case "Artesanía":
      return "yellow";
    case "Música":
    case "Comida":
      return "coral";
    case "Gratis":
    case "Humor":
      return "neon";
    case "Deporte":
      return "blue";
    default:
      return "blue";
  }
}

export function EventCard({ event }: { event: AppEvent }) {
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedEvents();
  const navigate = useNavigate();
  const saved = isSaved(event.id);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Inicia sesión para guardar planes", {
        action: {
          label: "Entrar",
          onClick: () =>
            navigate({ to: "/auth", search: { mode: "login", redirect: `/evento/${event.id}` } }),
        },
      });
      return;
    }
    await toggleSave(event.id);
  };

  return (
    <Link
      to="/evento/$id"
      params={{ id: event.id }}
      className="card-lift group relative block overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
          style={pillStyle(event.mainCategory)}
        >
          {event.mainCategory}
        </span>
        <button
          onClick={handleSave}
          aria-label={saved ? "Quitar de guardados" : "Guardar"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/95 backdrop-blur transition hover:scale-110"
        >
          <Bookmark
            className={`h-4 w-4 ${saved ? "fill-foreground text-foreground" : "text-foreground"}`}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug">{event.title}</h3>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {event.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {event.date} · {event.time}
          </span>
        </div>

        {event.tags.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-sm">
            <Users className="h-4 w-4 text-[color:var(--brand-blue)]" />
            <span className="font-bold">{event.attendeesCount}</span>{" "}
            <span className="text-muted-foreground">van</span>
          </span>
          <span className="text-sm font-semibold text-[color:var(--brand-blue)] group-hover:underline">
            Apuntarme →
          </span>
        </div>
      </div>
    </Link>
  );
}
