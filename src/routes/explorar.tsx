import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { UploadCTA } from "@/components/UploadCTA";
import { VIBES, eventsByVibe, searchEvents, vibeBySlug, type Vibe } from "@/lib/events-data";

type ExplorarSearch = { q?: string; vibe?: string };

export const Route = createFileRoute("/explorar")({
  validateSearch: (search: Record<string, unknown>): ExplorarSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    vibe: typeof search.vibe === "string" && search.vibe ? search.vibe : undefined,
  }),
  component: ExplorarPage,
  head: () => ({
    meta: [
      { title: "Explorar planes — ENTÉRATE" },
      { name: "description", content: "Explora todos los planes que están pasando en Granada." },
    ],
  }),
});

function ExplorarPage() {
  const { q = "", vibe = "todos" } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q);

  const activeVibe: Vibe | "Todos" = vibeBySlug(vibe)?.name ?? "Todos";

  const list = useMemo(() => {
    let base = eventsByVibe(activeVibe);
    if (q.trim()) {
      const filtered = searchEvents(q);
      base = base.filter((e) => filtered.includes(e));
    }
    return base;
  }, [activeVibe, q]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border bg-background py-10 md:py-14">
          <div className="mx-auto max-w-5xl px-4 md:px-8">
            <h1 className="font-display text-4xl font-extrabold leading-[1] tracking-tight md:text-5xl">
              Explora y <span className="mark-yellow">entérate</span>
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              Cotillea qué está pasando por Granada — pa' que te enteres de to' 👀
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({
                  to: "/explorar",
                  search: { q: query || undefined, vibe: vibe === "todos" ? undefined : vibe },
                });
              }}
              className="mt-6 flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-2.5 shadow-[3px_3px_0_0_oklch(0.2_0_0)] transition focus-within:-translate-y-0.5"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca conciertos, mercadillos, talleres…"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        <section className="border-b border-border bg-background py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="mb-4 text-sm font-medium text-muted-foreground">Salta a una vibe →</p>
            <div className="flex flex-wrap gap-3">
              {VIBES.filter((c) => c.name !== "Todos").map((c) => (
                <Link
                  key={c.name}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className="flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-2 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5"
                  style={{ boxShadow: `3px 3px 0 ${c.color}` }}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {list.length} {list.length === 1 ? "plan" : "planes"}
              {q && (
                <>
                  {" "}para “<span className="text-[color:var(--brand-coral)]">{q}</span>”
                </>
              )}
            </h2>
          </div>

          {list.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">Nada por aquí con esos filtros. Prueba otra vibe ✌️</p>
            </div>
          )}
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-[oklch(0.97_0.008_90)] py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              ¿Te has enterao de algo
              <br className="hidden md:block" />
              {" "}que <span className="italic underline decoration-[color:var(--brand-coral)] decoration-4 underline-offset-8">el resto no</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Súbelo. Seguro que alguien más quiere saberlo.
            </p>
            <Link
              to="/crear"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-extrabold text-background transition hover:-translate-y-1"
            >
              Cuéntalo →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
