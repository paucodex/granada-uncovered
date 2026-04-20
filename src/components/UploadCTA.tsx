export function UploadCTA() {
  return (
    <section id="subir" className="relative overflow-hidden border-y border-border bg-foreground py-20 text-background">
      <div className="absolute -left-10 top-10 h-40 w-40 rotate-12 rounded-full bg-[color:var(--brand-coral)] opacity-90 blur-2xl" />
      <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[color:var(--brand-blue)] opacity-80 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <span className="inline-block rotate-[-3deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase text-foreground">
          tu turno
        </span>
        <h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">
          ¿Te has enterado de algo
          <br />
          que <span className="italic underline decoration-[color:var(--brand-yellow)] decoration-4 underline-offset-8">el resto no</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-background/70">
          Súbelo. Seguro que alguien más quiere saberlo.
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-yellow)] px-8 py-4 text-lg font-extrabold text-foreground transition hover:-translate-y-1"
        >
          Contarlo →
        </a>
      </div>
    </section>
  );
}
