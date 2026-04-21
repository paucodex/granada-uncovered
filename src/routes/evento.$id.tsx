import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { MapPin, Clock, Users, Bookmark, Share2, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { getEvent, events, vibeBySlug } from "@/lib/events-data";
import { useAuth } from "@/auth/AuthProvider";
import { useSavedEvents } from "@/auth/useSavedEvents";
import { toast } from "sonner";

export const Route = createFileRoute("/evento/$id")({
  loader: ({ params }) => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  component: EventDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold">Evento no encontrado</h1>
        <Link to="/explorar"  className="mt-6 inline-block text-[color:var(--brand-blue)] underline">
          Ver otros planes
        </Link>
      </div>
    </div>
  ),
  head: ({ params }) => {
    const e = getEvent(params.id);
    if (!e) return { meta: [{ title: "Evento — ENTÉRATE" }] };
    return {
      meta: [
        { title: `${e.title} — ENTÉRATE` },
        { name: "description", content: e.description },
        { property: "og:title", content: e.title },
        { property: "og:description", content: e.description },
        { property: "og:image", content: e.image },
      ],
    };
  },
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedEvents();
  const navigate = useNavigate();
  const saved = isSaved(event.id);

  const related = events
    .filter((e) => e.id !== event.id && e.tags.some((t) => event.tags.includes(t)))
    .slice(0, 3);

  const onSave = async () => {
    if (!user) {
      navigate({ to: "/login", search: { redirect: `/evento/${event.id}` } });
      return;
    }
    await toggleSave(event.id);
  };

  const onShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: event.title, url: window.location.href });
      } catch {
        /* cancelled */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      toast("Enlace copiado");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <div className="mx-auto max-w-5xl px-4 pt-6 md:px-8">
          <Link
            to="/explorar"
            
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Volver a explorar
          </Link>
        </div>

        <section className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">
                {event.mainCategory}
              </span>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-2">
                {event.tags.map((t) => {
                  const meta = vibeBySlug(t.toLowerCase().replace("í", "i").replace("ú", "u"));
                  return (
                    <Link
                      key={t}
                      to="/explorar"
                      search={{ vibe: meta?.slug && meta.slug !== "todos" ? meta.slug : undefined }}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-foreground hover:text-foreground"
                    >
                      {t}
                    </Link>
                  );
                })}
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {event.date} · {event.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {event.location} · {event.district}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[color:var(--brand-blue)]" />
                  <span className="font-bold text-foreground">{event.attendeesCount}</span> van
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground">
                {event.description}
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-3">
                <Info label="Precio" value={event.price ?? event.priceType} />
                <Info label="Fuente" value={event.sourceType} />
                <Info label="Distrito" value={event.district} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={onSave}
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition"
                >
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-white" : ""}`} />
                  {saved ? "Guardado" : "Apuntarme"}
                </button>
                <button
                  onClick={onShare}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition"
                >
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
                {event.sourceUrl && (
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" /> Fuente
                  </a>
                )}
                {user && event.createdBy === user.id && (
                  <Link
                    to="/editar/$id"
                    params={{ id: event.id }}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-border px-5 py-3 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground transition"
                  >
                    Editar plan
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-border bg-[oklch(0.97_0.008_90)] py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <h2 className="mb-8 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                Planes parecidos
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
