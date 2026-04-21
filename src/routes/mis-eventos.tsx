import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { useAuth } from "@/auth/AuthProvider";
import { getUserEventsByCreator, deleteUserEvent } from "@/lib/user-events";
import type { AppEvent } from "@/lib/events-data";

export const Route = createFileRoute("/mis-eventos")({
  component: MisEventosPage,
  head: () => ({ meta: [{ title: "Mis eventos — ENTÉRATE" }] }),
});

function MisEventosPage() {
  const { user, loading } = useAuth();
  const [mine, setMine] = useState<AppEvent[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (user) setMine(getUserEventsByCreator(user.id));
  }, [user]);

  const onDelete = (id: string) => {
    deleteUserEvent(id);
    setMine((prev) => prev.filter((e) => e.id !== id));
    setConfirmId(null);
    toast.success("Plan eliminado");
  };

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
      <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Mis <span className="mark-yellow">eventos</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Aquí están los planes que tú has subido.
            </p>
          </div>
          <Link
            to="/crear"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background"
          >
            Subir un plan →
          </Link>
        </div>

        {mine.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">Aún no has subido ningún plan.</p>
            <Link
              to="/crear"
              className="mt-5 inline-block rounded-full bg-[color:var(--brand-yellow)] px-5 py-2.5 text-sm font-bold text-foreground"
            >
              Subir tu primer plan →
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mine.map((e) => (
              <div key={e.id} className="space-y-3">
                <EventCard event={e} />
                <div className="flex items-center gap-2">
                  <Link
                    to="/editar/$id"
                    params={{ id: e.id }}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-foreground bg-background px-4 py-2 text-xs font-bold hover:bg-foreground hover:text-background transition"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Link>
                  {confirmId === e.id ? (
                    <>
                      <button
                        onClick={() => onDelete(e.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-[color:var(--destructive,#ef4444)] px-3 py-2 text-xs font-bold text-white"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-full border-2 border-border bg-background px-3 py-2 text-xs font-semibold"
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmId(e.id)}
                      aria-label="Eliminar plan"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[color:var(--destructive,#ef4444)] px-4 py-2 text-xs font-bold text-[color:var(--destructive,#ef4444)] hover:bg-[color:var(--destructive,#ef4444)] hover:text-white transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
