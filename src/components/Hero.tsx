export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-28">
        {/* Floating sticker chips */}
        <div className="absolute right-6 top-10 hidden md:block">
          <div className="animate-wiggle rounded-full bg-[color:var(--brand-coral)] px-4 py-2 text-sm font-bold text-white shadow-lg rotate-6">
            lo viste aquí primero ✦
          </div>
        </div>
        <div className="absolute left-[42%] top-6 hidden lg:block">
          <div className="animate-float rounded-full border-2 border-foreground bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-bold rotate-[-8deg]">
            granada · hoy
          </div>
        </div>

        <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--brand-neon)]" />
          en directo · 47 planes activos
        </p>

        <h1 className="font-display text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.9]">
          ¿NO TE HAS{" "}
          <span className="relative inline-block">
            <span className="mark-yellow">ENTERAO</span>
            {/* hand-drawn arrow */}
            <svg
              className="absolute -right-12 -top-8 hidden h-16 w-16 md:block"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 50 C 20 10, 45 10, 58 28" />
              <path d="M58 28 L 50 22 M58 28 L 52 36" />
            </svg>
          </span>
          ?
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Planes, cultura y cosas que están pasando en{" "}
          <span className="font-semibold text-foreground underline-wavy">Granada</span> —
          aunque no salgan en Google.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#semana"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.58_0.22_263/0.6)] transition hover:-translate-y-0.5"
          >
            Ver qué está pasando →
          </a>
          <a
            href="#subir"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3.5 text-base font-semibold transition hover:bg-foreground hover:text-background"
          >
            Subir algo
          </a>
          <span className="text-sm text-muted-foreground italic">
            ↳ esto no estaba en Google
          </span>
        </div>
      </div>
    </section>
  );
}
