import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
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

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(40, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Ese email no parece válido")
    .max(255, "El email es demasiado largo"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(72, "La contraseña es demasiado larga"),
});

type FieldErrors = Partial<Record<"username" | "email" | "password", string>>;

function RegisterPage() {
  const { redirect } = useSearch({ from: "/register" });
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = registerSchema.safeParse({ username, email, password });
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
    const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.username);
    setLoading(false);

    if (error) {
      const msg = error.message;
      if (/cuenta con ese email/i.test(msg)) {
        setErrors({ email: msg });
      } else if (/contraseña/i.test(msg)) {
        setErrors({ password: msg });
      } else if (/email/i.test(msg)) {
        setErrors({ email: msg });
      } else {
        toast.error(msg);
      }
      return;
    }

    toast.success("¡Cuenta creada! Inicia sesión pa' empezar.");
    navigate({ to: "/login", search: { redirect } });
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

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field
            label="Nombre o alias"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Cómo quieres que te llamen"
            autoComplete="nickname"
            error={errors.username}
          />
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
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.58_0.22_263/0.6)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Creando cuenta…" : "Crear cuenta"}
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
