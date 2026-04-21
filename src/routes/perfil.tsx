import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";

export const Route = createFileRoute("/perfil")({
  component: PerfilPage,
  head: () => ({ meta: [{ title: "Mi perfil — ENTÉRATE" }] }),
});

function PerfilPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <FullScreen text="Cargando…" />;
  if (!user) return <NotLogged />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl font-extrabold leading-tight">Mi perfil</h1>
        <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/guardados"
            className="rounded-2xl border-2 border-foreground bg-card p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
          >
            <h3 className="font-display text-xl font-extrabold">Guardados</h3>
            <p className="mt-1 text-sm text-muted-foreground">Los planes que te interesan.</p>
          </Link>
          <Link
            to="/mis-eventos"
            className="rounded-2xl border-2 border-foreground bg-card p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
          >
            <h3 className="font-display text-xl font-extrabold">Mis eventos</h3>
            <p className="mt-1 text-sm text-muted-foreground">Los planes que has subido tú.</p>
          </Link>
        </div>

        <button
          onClick={() => signOut()}
          className="mt-10 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground"
        >
          Cerrar sesión
        </button>
      </main>
      <Footer />
    </div>
  );
}

function NotLogged() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">Entra para ver tu perfil</h1>
        <Link
          to="/login"
          search={{ redirect: "/perfil" }}
          className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
        >
          Iniciar sesión
        </Link>
      </main>
    </div>
  );
}

function FullScreen({ text }: { text: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
      {text}
    </div>
  );
}
