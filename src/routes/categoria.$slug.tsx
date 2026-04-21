import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { eventsByVibe, vibeBySlug, VIBES } from "@/lib/events-data";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const vibe = vibeBySlug(params.slug);
    if (!vibe || vibe.name === "Todos") throw notFound();
    return { vibe };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold">Categoría no encontrada</h1>
        <Link to="/explorar" search={{ q: "", vibe: "todos" }} className="mt-6 inline-block text-[color:var(--brand-blue)] underline">
          Ver todos los planes
        </Link>
      </div>
    </div>
  ),
  head: ({ params }) => {
    const v = vibeBySlug(params.slug);
    return {
      meta: [
        { title: `${v?.name ?? "Categoría"} en Granada — ENTÉRATE` },
        { name: "description", content: `Planes de ${v?.name ?? ""} en Granada.` },
      ],
    };
  },
});

function CategoryPage() {
  const { vibe } = Route.useLoaderData();
  const list = eventsByVibe(vibe.name);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section
          className="border-b border-border py-12 md:py-16"
          style={{ backgroundColor: `color-mix(in oklab, ${vibe.color} 18%, var(--background))` }}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Link to="/explorar" search={{ q: "", vibe: "todos" }} className="hover:underline">
                ← Explorar
              </Link>
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1] tracking-tight md:text-6xl">
              <span className="mr-3">{vibe.emoji}</span>
              {vibe.name}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              {list.length} {list.length === 1 ? "plan" : "planes"} con esta vibe en Granada.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 md:px-8">
            {VIBES.filter((v) => v.name !== "Todos" && v.name !== vibe.name).map((v) => (
              <Link
                key={v.name}
                to="/categoria/$slug"
                params={{ slug: v.slug }}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                {v.emoji} {v.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          {list.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">Aún no hay planes con esta vibe.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
