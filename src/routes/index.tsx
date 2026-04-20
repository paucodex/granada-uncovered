import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { EventCard } from "@/components/EventCard";
import { Categories, type CategoryFilter } from "@/components/Categories";
import { UploadCTA } from "@/components/UploadCTA";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { thisWeekEvents, discoveryEvents } from "@/lib/events-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ENTÉRATE — Planes y cultura en Granada" },
      {
        name: "description",
        content:
          "Descubre eventos, planes culturales y cosas que están pasando en Granada — aunque no salgan en Google.",
      },
      { property: "og:title", content: "ENTÉRATE — Planes en Granada" },
      {
        property: "og:description",
        content: "Lo que está pasando en Granada de verdad. Súbete al feed de la ciudad.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@600;700;800;900&display=swap",
      },
    ],
  }),
});

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Todos");

  const filteredWeek = useMemo(
    () =>
      selectedCategory === "Todos"
        ? thisWeekEvents
        : thisWeekEvents.filter((event) => event.category === selectedCategory),
    [selectedCategory],
  );

  const filteredDiscovery = useMemo(
    () =>
      selectedCategory === "Todos"
        ? discoveryEvents
        : discoveryEvents.filter((event) => event.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Categories active={selectedCategory} onSelect={setSelectedCategory} />

        <section id="semana" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <SectionHeader
            eyebrow="Esta semana"
            cta={
              <a href="#" className="text-sm font-semibold underline-offset-4 hover:underline">
                Ver toda la agenda →
              </a>
            }
          >
            Esta <span className="mark-yellow">semana</span> en Granada
          </SectionHeader>
          {filteredWeek.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWeek.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border-2 border-dashed border-border p-10 text-center text-muted-foreground">
              Nada de esta vibe esta semana. Prueba otra categoría ✌️
            </p>
          )}
        </section>

        <section
          id="explorar"
          className="border-t border-border bg-[oklch(0.97_0.008_90)] py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeader eyebrow="Bajo el radar">
              ¿No te has enterao de{" "}
              <span className="italic underline decoration-[color:var(--brand-coral)] decoration-[5px] underline-offset-[10px]">
                esto
              </span>
              ?
            </SectionHeader>
            {filteredDiscovery.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDiscovery.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border-2 border-dashed border-border p-10 text-center text-muted-foreground">
                Aún no hay nada bajo el radar de esta categoría.
              </p>
            )}
          </div>
        </section>

        <HowItWorks />
        <UploadCTA />
      </main>
      <Footer />
    </div>
  );
}
