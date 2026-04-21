import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";

export const Route = createFileRoute("/mis-eventos")({
  component: MisEventosPage,
  head: () => ({ meta: [{ title: "Mis eventos — ENTÉRATE" }] }),
});

function MisEventosPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        Cargando…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-extrabold">Entra para ver tus eventos</h1>
          <Link
            to="/login"
            search={{ redirect: "/mis-eventos" }}
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Iniciar sesión
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
          Mis <span className="mark-yellow">eventos</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Aquí verás los planes que tú has subido.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">Aún no has subido ningún plan.</p>
          <Link
            to="/crear"
            className="mt-5 inline-block rounded-full bg-[color:var(--brand-yellow)] px-5 py-2.5 text-sm font-bold text-foreground"
          >
            Subir un plan →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
