import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

type AuthSearch = { redirect?: string; mode?: "login" | "signup" };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/",
    mode: search.mode === "signup" ? "signup" : "login",
  }),
  component: AuthPage,
  head: () => ({
    meta: [{ title: "Entrar — ENTÉRATE" }],
  }),
});

function AuthPage() {
  const { mode, redirect } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignup, setIsSignup] = useState(mode === "signup");
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
    const { error } = isSignup
      ? await signUp(email, password)
      : await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(isSignup ? "Cuenta creada ✦" : "Bienvenido de vuelta");
    navigate({ to: redirect || "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <Logo />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12 md:py-24">
        <div>
          <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
            {isSignup ? "nuevx por aquí" : "de vuelta"}
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight">
            {isSignup ? (
              <>
                Crea tu <span className="mark-yellow">cuenta</span>
              </>
            ) : (
              <>
                Bienvenidx a <span className="mark-yellow">ENTÉRATE</span>
              </>
            )}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup
              ? "Guarda planes, sube los tuyos, entérate antes que nadie."
              : "Entra para guardar planes y subir los tuyos."}
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
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition focus:border-foreground"
              placeholder="mínimo 6 caracteres"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.58_0.22_263/0.6)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "..." : isSignup ? "Crear cuenta" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isSignup ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {isSignup ? "Entrar" : "Crear cuenta"}
          </button>
        </p>

        <Link
          to="/"
          className="mx-auto text-sm text-muted-foreground hover:text-foreground"
        >
          ← Volver al inicio
        </Link>
      </main>
    </div>
  );
}
