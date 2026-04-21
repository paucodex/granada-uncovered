import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useAuth } from "@/auth/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

type LoginSearch = { redirect: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/",
  }),
  component: LoginPage,
  head: () => ({ meta: [{ title: "Iniciar sesión — ENTÉRATE" }] }),
});

const loginSchema = z.object({
  email: z.string().trim().email("Ese email no parece válido").max(255),
  password: z.string().min(1, "Escribe tu contraseña").max(72),
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

function LoginPage() {
  const { redirect } = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setLoading(false);

    if (error) {
      const msg = error.message;
      if (/no hay ninguna cuenta/i.test(msg)) {
        setErrors({ email: msg });
      } else if (/incorrectos/i.test(msg)) {
        // Generic credentials error — show under password
        setErrors({ password: msg });
      } else if (/email/i.test(msg)) {
        setErrors({ email: msg });
      } else {
        toast.error(msg);
      }
      return;
    }

    toast.success("Bienvenidx de vuelta ✦");
    navigate({ to: redirect || "/" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16 md:py-24">
        <div>
          <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
            de vuelta
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight">
            Bienvenidx a <span className="mark-yellow">ENTÉRATE</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entra para guardar planes y subir los tuyos.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@email.com"
            autoComplete="email"
            error={errors.email}
          />
          <Field
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Tu contraseña"
            autoComplete="current-password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.58_0.22_263/0.6)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ¿Aún no tienes cuenta?{" "}
          <Link
            to="/register"
            search={{ redirect }}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`rounded-xl border-2 bg-card px-4 py-3 text-base outline-none transition focus:border-foreground ${
          error ? "border-[color:var(--brand-coral)]" : "border-border"
        }`}
      />
      {error && (
        <span className="text-xs font-semibold text-[color:var(--brand-coral)]">{error}</span>
      )}
    </label>
  );
}
