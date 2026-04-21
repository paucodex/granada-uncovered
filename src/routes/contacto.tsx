import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contacto")({
  component: ContactoPage,
  head: () => ({
    meta: [
      { title: "Contacto — ENTÉRATE" },
      {
        name: "description",
        content: "¿Quieres contarnos algo? Escríbenos y te leemos.",
      },
    ],
  }),
});

function ContactoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
          háblanos
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1] tracking-tight md:text-5xl">
          ¿Tienes algo <span className="mark-yellow">que contarnos</span>?
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Si te has enterao de un plan, quieres colaborar o simplemente saludar — escríbenos. Esto lo hacemos entre todxs.
        </p>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)]">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</p>
            <p className="mt-1 font-display text-lg font-extrabold">hola@enterate.gr</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Respondemos cuando podemos, pero respondemos.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)]">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">¿Dónde?</p>
            <p className="mt-1 font-display text-lg font-extrabold">Granada, of course</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Nacido en el Realejo, criao en el Albaicín.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border-2 border-foreground bg-[color:var(--brand-yellow)] p-8 text-center">
          <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
            ¿Te has enterao de algo que el resto no?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm">
            No hace falta escribirnos. Súbelo tú mismx, es más rápido.
          </p>
          <Link
            to="/crear"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-extrabold text-background transition hover:-translate-y-0.5"
          >
            Subir un plan →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
