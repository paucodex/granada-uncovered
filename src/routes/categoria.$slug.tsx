import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { VIBES, eventsByVibe, vibeBySlug } from "@/lib/events-data";
import { UploadCTA } from "@/components/UploadCTA";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const vibe = vibeBySlug(params.slug);
    if (!vibe) throw notFound();
    return { vibe };
  },
  component: CategoriaPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Esta vibe no existe</h1>
        <p className="mt-3 text-muted-foreground">Quizá te equivocaste de calle. Vuelve y prueba otra.</p>
        <Link
          to="/explorar"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-extrabold text-background"
        >
          Ver todos los planes →
        </Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Algo se ha torcío</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </main>
      <Footer />
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.vibe.name} en Granada — ENTÉRATE` },
          {
            name: "description",
            content: `Planes de ${loaderData.vibe.name.toLowerCase()} que están pasando en Granada.`,
          },
        ]
      : [{ title: "Categoría — ENTÉRATE" }],
  }),
});

function CategoriaPage() {
  const { vibe } = Route.useLoaderData();
  const list = vibe.name === "Todos" ? eventsByVibe("Todos") : eventsByVibe(vibe.name);

  // Otras vibes (excluye la actual y "Todos")
  const otrasVibes = VIBES.filter((v) => v.slug !== vibe.slug && v.name !== "Todos");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Mini hero de la categoría */}
        <section
          className="border-b border-border py-12 md:py-16"
          style={{ backgroundColor: `color-mix(in oklab, ${vibe.color} 18%, var(--background))` }}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Link
              to="/explorar"
              className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              ← Todos los planes
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-foreground text-3xl"
                style={{ backgroundColor: vibe.color, boxShadow: `4px 4px 0 var(--foreground)` }}
              >
                {vibe.emoji}
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Vibe</p>
                <h1 className="font-display text-4xl font-extrabold leading-[1] tracking-tight md:text-5xl">
                  {vibe.name}
                </h1>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              {list.length} {list.length === 1 ? "plan" : "planes"} de {vibe.name.toLowerCase()} en Granada — pa' que te enteres.
            </p>
          </div>
        </section>

        {/* Grid de eventos */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          {list.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                Aún no hay planes de {vibe.name.toLowerCase()}. ¿Conoces alguno?{" "}
                <Link to="/crear" className="font-bold text-foreground underline">
                  Cuéntalo
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        {/* Otras vibes — para no quedarse encerrao */}
        <section className="border-t border-border bg-[oklch(0.97_0.008_90)] py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Explora otras vibes
            </h2>
            <p className="mt-2 text-muted-foreground">Que en Granada pasan más cosas de las que crees.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {otrasVibes.map((v) => (
                <Link
                  key={v.slug}
                  to="/categoria/$slug"
                  params={{ slug: v.slug }}
                  className="flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-base font-bold text-foreground transition-all hover:-translate-y-0.5"
                  style={{ boxShadow: `4px 4px 0 ${v.color}` }}
                >
                  <span className="text-lg">{v.emoji}</span>
                  {v.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <UploadCTA />
      </main>
      <Footer />
    </div>
  );
}
