import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:grid md:grid-cols-12 md:gap-10 md:px-8 md:pb-24 md:pt-20">
        {/* Left: copy */}
        <div className="md:col-span-7">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand-neon)]" />
            En directo · 26 planes activos en Granada
          </p>

          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            ¿No te has{" "}
            <span className="mark-yellow">enterao</span>?
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-base">
            Planes y eventos están pasando en Granada — pa' que te enteres de to'! 👀
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/explorar"
              search={{ q: "", vibe: "todos" }}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_oklch(0.58_0.22_263/0.55)] transition hover:-translate-y-0.5"
            >
              Cotillea qué está pasando →
            </Link>
            <Link
              to="/crear"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-3 text-sm font-semibold transition hover:bg-foreground hover:text-background"
            >
              Subir planes
            </Link>
          </div>
        </div>

        {/* Right: stat / mini visual block — anchored, not floating */}
        <div className="mt-12 md:col-span-5 md:mt-0">
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-sm">
            <span className="absolute -top-3 left-5 rotate-[-3deg] rounded-full bg-[color:var(--brand-coral)] px-3 py-1 text-[11px] font-extrabold uppercase text-white">
              Granada · hoy
            </span>
            <div className="grid grid-cols-2 gap-5">
              <Stat n="26" label="planes activos" />
              <Stat n="12" label="esta noche" accent="blue" />
              <Stat n="52" label="esta semana" accent="purple" />
              <Stat n="8" label="gratis hoy" accent="neon" />
            </div>
            <p className="mt-5 border-t border-border pt-4 text-xs italic text-muted-foreground">
              "Lo viste aquí primero." — el feed de la ciudad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  n,
  label,
  accent = "default",
}: {
  n: string;
  label: string;
  accent?: "default" | "blue" | "purple" | "neon";
}) {
  const colors: Record<string, string> = {
    default: "var(--foreground)",
    blue: "var(--brand-blue)",
    purple: "var(--brand-purple)",
    neon: "oklch(0.55 0.2 140)",
  };
  return (
    <div>
      <div
        className="font-display text-4xl font-extrabold leading-none"
        style={{ color: colors[accent] }}
      >
        {n}
      </div>
      <div className="mt-1.5 text-xs font-medium text-muted-foreground">{label}</div>
    </div>
  );
}
