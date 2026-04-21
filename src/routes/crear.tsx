import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";

export const Route = createFileRoute("/crear")({
  component: CrearPage,
  head: () => ({ meta: [{ title: "Subir un plan — ENTÉRATE" }] }),
});

function CrearPage() {
  const { user } = useAuth();

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
        <p className="mt-4 text-base text-muted-foreground">
          Súbelo. Seguro que alguien más quiere saberlo.
        </p>

        {!user ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center">
            <p className="text-base">
              Necesitas una cuenta para subir planes (¡es gratis!)
            </p>
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
        ) : (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              Próximamente: aquí podrás subir tus propios planes con título, imagen, fecha,
              ubicación y vibes. (Fase 2)
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
