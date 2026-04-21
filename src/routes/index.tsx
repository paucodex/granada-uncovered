import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { EventCard } from "@/components/EventCard";
import { Categories } from "@/components/Categories";
import { UploadCTA } from "@/components/UploadCTA";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { getThisWeekEvents, getDiscoveryEvents, type AppEvent } from "@/lib/events-data";

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
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Categories asLinks />

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <SectionHeader
            eyebrow="LO QUE SE CUECE AHORA"
            cta={
              <Link
                to="/explorar"
                className="text-sm font-semibold underline-offset-4 hover:underline"
              >
                Ver toda la agenda →
              </Link>
            }
          >
            Esta <span className="mark-yellow">semana</span> en Granada
          </SectionHeader>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {thisWeekEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-[oklch(0.97_0.008_90)] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeader eyebrow="COSITAS OCULTAS">
              ¿No te has enterao de{" "}
              <span className="italic underline decoration-[color:var(--brand-coral)] decoration-[5px] underline-offset-[10px]">
                esto
              </span>
              ?
            </SectionHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoveryEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <UploadCTA />
      </main>
      <Footer />
    </div>
  );
}
