import { Compass, Zap, Megaphone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Descubre lo que está pasando",
    text: "Planes y eventos que ocurren en Granada que no salen en motores de búsqueda.",
    color: "var(--brand-purple)",
    sticker: "en la calle",
    rotate: "-rotate-2",
  },
  {
    n: "02",
    icon: Zap,
    title: "Entérate antes que nadie",
    text: "Lo que ves en redes, carteles o de boca en boca… aquí aparece.",
    color: "var(--brand-coral)",
    sticker: "tú primero",
    rotate: "rotate-1",
  },
  {
    n: "03",
    icon: Megaphone,
    title: "¿Has visto algo? Súbelo",
    text: "Si te enteras de algo interesante, ¡compártelo!.",
    color: "var(--brand-blue)",
    sticker: "tu turno",
    rotate: "-rotate-1",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-va"
      className="border-t border-border bg-background py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader eyebrow="CÓMO VA">
          ¿Cómo funciona{" "}
          <span className="mark-yellow">ENTÉRATE</span>?
        </SectionHeader>
        <p className="-mt-6 mb-12 max-w-xl text-base text-muted-foreground md:text-lg">
          Más fácil de lo que parece.
        </p>

        <div className="relative grid gap-6 md:grid-cols-3 md:gap-5">
          {/* Connecting squiggle on desktop */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-16 hidden h-6 w-full md:block"
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
          >
            <path
              d="M0 12 Q 150 -8 300 12 T 600 12 T 900 12 T 1200 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="text-foreground/20"
            />
          </svg>

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="group relative rounded-2xl border-2 border-foreground bg-card p-6 transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--foreground)] md:p-7"
              >
                {/* Sticker */}
                <span
                  className={`absolute -top-3 right-4 ${s.rotate} rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-foreground`}
                  style={{ backgroundColor: s.color }}
                >
                  {s.sticker}
                </span>

                {/* Number + icon */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="font-display text-5xl font-extrabold leading-none"
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={2.5} />
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">{s.text}</p>

                {/* Arrow on mobile between cards */}
                {i < steps.length - 1 && (
                  <div className="mt-4 flex justify-center text-foreground/40 md:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4v16m0 0l-5-5m5 5l5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
