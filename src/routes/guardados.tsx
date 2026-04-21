import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { useAuth } from "@/auth/AuthProvider";
import { useSavedEvents } from "@/auth/useSavedEvents";
import { events } from "@/lib/events-data";

export const Route = createFileRoute("/guardados")({
  component: GuardadosPage,
  head: () => ({ meta: [{ title: "Mis guardados — ENTÉRATE" }] }),
});

function GuardadosPage() {
  const { user, loading } = useAuth();
  const { savedIds } = useSavedEvents();

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
          <h1 className="font-display text-3xl font-extrabold">Entra para ver tus guardados</h1>
          <Link
            to="/login"
            search={{ redirect: "/guardados" }}
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Iniciar sesión
          </Link>
        </main>
      </div>
    );
  }

  const list = events.filter((e) => savedIds.has(e.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
          Mis <span className="mark-yellow">guardados</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {list.length} {list.length === 1 ? "plan guardado" : "planes guardados"}
        </p>

        {list.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Aún no has guardado ningún plan.</p>
            <Link
              to="/explorar"
              
              className="mt-5 inline-block rounded-full bg-[color:var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Explorar planes →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
