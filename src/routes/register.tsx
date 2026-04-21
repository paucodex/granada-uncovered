import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

type RegisterSearch = { redirect: string };

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/",
  }),
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Crear cuenta — ENTÉRATE" }] }),
});

function RegisterPage() {
  const { redirect } = useSearch({ from: "/register" });
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Cuenta creada ✦");
    navigate({ to: redirect || "/" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16 md:py-24">
        <div>
          <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
            nuevx por aquí
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight">
            Crea tu <span className="mark-yellow">cuenta</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Guarda planes, sube los tuyos, entérate antes que nadie.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition focus:border-foreground"
              placeholder="tu@email.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Contraseña
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition focus:border-foreground"
              placeholder="mínimo 6 caracteres"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.58_0.22_263/0.6)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            search={{ redirect }}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
