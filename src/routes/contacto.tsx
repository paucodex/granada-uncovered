import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UploadCTA } from "@/components/UploadCTA";

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

      </main>
      <UploadCTA />
      <Footer />
    </div>
  );
}
