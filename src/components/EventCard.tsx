import { MapPin, Clock, Users } from "lucide-react";

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
  accent?: "yellow" | "coral" | "blue" | "none";
  tag?: string;
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[event.category]}`}
        >
          {event.category}
        </span>
        {event.tag && (
          <span className="absolute right-3 top-3 rotate-3 rounded-md border-2 border-foreground bg-background px-2 py-0.5 text-[11px] font-extrabold uppercase">
            {event.tag}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold leading-tight">
          {event.accent === "yellow" ? (
            <>
              <span className="mark-yellow">{event.title.split(" ")[0]}</span>{" "}
              {event.title.split(" ").slice(1).join(" ")}
            </>
          ) : (
            event.title
          )}
        </h3>

        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {event.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {event.time}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <Users className="h-4 w-4 text-[color:var(--brand-blue)]" />
            <span className="font-bold">{event.going}</span> van
          </span>
          <button className="text-sm font-semibold text-[color:var(--brand-blue)] hover:underline">
            Apuntarme →
          </button>
        </div>
      </div>
    </article>
  );
}
