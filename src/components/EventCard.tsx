import { MapPin, Clock, Users, Bookmark } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";
import { useSavedEvents } from "@/auth/useSavedEvents";
import { toast } from "sonner";

export type EventCategory = "Cultura" | "Mercadillos" | "Música" | "Gratis";

const categoryStyles: Record<EventCategory, string> = {
  Cultura: "bg-[color:var(--brand-purple)] text-white",
  Mercadillos: "bg-[color:var(--brand-yellow)] text-foreground",
  Música: "bg-[color:var(--brand-coral)] text-white",
  Gratis: "bg-[color:var(--brand-neon)] text-foreground",
};

export interface EventItem {
  id: string;
  title: string;
  image: string;
  category: EventCategory;
  location: string;
  time: string;
  going: number;
  featured?: boolean;
}

export function EventCard({ event }: { event: EventItem }) {
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedEvents();
  const navigate = useNavigate();
  const saved = isSaved(event.id);

  const handleSave = async () => {
    if (!user) {
      toast("Inicia sesión para guardar planes", {
        action: {
          label: "Entrar",
          onClick: () => navigate({ to: "/auth", search: { mode: "login", redirect: "/" } }),
        },
      });
      return;
    }
    await toggleSave(event.id);
  };

  return (
    <article className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-card">
      {event.featured && (
        <span className="absolute -top-2 left-4 z-10 rotate-[-4deg] rounded-md bg-foreground px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[color:var(--brand-yellow)]">
          ✦ lo viste aquí primero
        </span>
      )}
      <div className="relative aspect-[5/4] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[event.category]}`}
        >
          {event.category}
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
            <Clock className="h-3.5 w-3.5" /> {event.time}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-sm">
            <Users className="h-4 w-4 text-[color:var(--brand-blue)]" />
            <span className="font-bold">{event.going}</span>{" "}
            <span className="text-muted-foreground">van</span>
          </span>
          <button className="text-sm font-semibold text-[color:var(--brand-blue)] hover:underline">
            Apuntarme →
          </button>
        </div>
      </div>
    </article>
  );
}
