import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventForm } from "@/components/EventForm";
import { useAuth } from "@/auth/AuthProvider";

export const Route = createFileRoute("/crear")({
  component: CrearPage,
  head: () => ({ meta: [{ title: "Subir un plan — ENTÉRATE" }] }),
});

function CrearPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
          <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
            tu turno
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            ¿Has visto algo? <span className="mark-yellow">Súbelo</span>
          </h1>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center">
            <p className="text-base">Necesitas una cuenta para subir planes (¡es gratis!)</p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                to="/login"
                search={{ redirect: "/crear" }}
                className="rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-sm font-semibold"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                search={{ redirect: "/crear" }}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
        <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
          tu turno
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          ¿Te has <span className="mark-yellow">enterao</span> de algo? Compártelo
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Si tú lo sabes, alguien más quiere saberlo.
        </p>
        <div className="mt-4 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 py-3 text-sm">
          <strong className="font-bold">Solo planes abiertos al público.</strong>{" "}
          <span className="text-muted-foreground">Nada de eventos privados.</span>
        </div>

        <EventForm mode="create" />
      </main>
      <Footer />
    </div>
  );
}
