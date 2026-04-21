import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventForm } from "@/components/EventForm";
import { useAuth } from "@/auth/AuthProvider";
import { findUserEvent, deleteUserEvent } from "@/lib/user-events";
import type { AppEvent } from "@/lib/events-data";

export const Route = createFileRoute("/editar/$id")({
  component: EditarPage,
  head: () => ({ meta: [{ title: "Editar plan — ENTÉRATE" }] }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold">Plan no encontrado</h1>
        <Link to="/mis-eventos" className="mt-6 inline-block text-[color:var(--brand-blue)] underline">
          Volver a mis eventos
        </Link>
      </div>
    </div>
  ),
});

function EditarPage() {
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState<AppEvent | null | undefined>(undefined);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    const found = findUserEvent(id);
    setEvent(found ?? null);
  }, [id]);

  if (loading || event === undefined) {
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
          <h1 className="font-display text-3xl font-extrabold">Entra para editar tu plan</h1>
          <Link
            to="/login"
            search={{ redirect: `/editar/${id}` }}
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Iniciar sesión
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (event === null) {
    throw notFound();
  }

  if (event.createdBy !== user.id) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-extrabold">Este plan no es tuyo</h1>
          <p className="mt-3 text-muted-foreground">Solo puedes editar los planes que has subido.</p>
          <Link
            to="/mis-eventos"
            className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Mis eventos
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const onDelete = () => {
    deleteUserEvent(event.id);
    toast.success("Plan eliminado");
    navigate({ to: "/mis-eventos" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
        <Link to="/mis-eventos" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver a mis eventos
        </Link>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          Editar <span className="mark-yellow">plan</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Cambia lo que haga falta. Los cambios se guardan al instante.
        </p>

        <EventForm mode="edit" initialEvent={event} />

        <div className="mt-10 rounded-2xl border-2 border-dashed border-[color:var(--destructive,#ef4444)]/60 bg-card p-5">
          <h2 className="font-bold text-[color:var(--destructive,#ef4444)]">Eliminar plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Esta acción no se puede deshacer. El plan dejará de aparecer para todo el mundo.
          </p>
          {confirmingDelete ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={onDelete}
                className="rounded-full bg-[color:var(--destructive,#ef4444)] px-5 py-2.5 text-sm font-bold text-white"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="rounded-full border-2 border-border bg-background px-5 py-2.5 text-sm font-semibold"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="mt-4 rounded-full border-2 border-[color:var(--destructive,#ef4444)] px-5 py-2.5 text-sm font-bold text-[color:var(--destructive,#ef4444)] hover:bg-[color:var(--destructive,#ef4444)] hover:text-white transition"
            >
              Eliminar este plan
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
