import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/perfil")({
  component: PerfilPage,
  head: () => ({ meta: [{ title: "Mi perfil — ENTÉRATE" }] }),
});

interface ProfileRow {
  id: string;
  user_id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

const profileSchema = z.object({
  display_name: z.string().trim().min(2, "Mínimo 2 caracteres").max(60, "Máximo 60 caracteres"),
  username: z
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(30, "Máximo 30 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "Solo letras, números, guiones y _"),
  avatar_url: z
    .string()
    .trim()
    .url("Tiene que ser una URL válida")
    .max(500)
    .or(z.literal("")),
});

function PerfilPage() {
  const { user, loading: authLoading, signOut } = useAuth();

  if (authLoading) return <FullScreen text="Cargando…" />;
  if (!user) return <NotLogged />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-4xl font-extrabold leading-tight">Mi perfil</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ajusta cómo te ven los demás en ENTÉRATE.
        </p>

        <ProfileForm userId={user.id} email={user.email ?? ""} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
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

function ProfileForm({ userId, email }: { userId: string; email: string }) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"display_name" | "username" | "avatar_url", string>>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, username, avatar_url")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        toast.error("No pudimos cargar tu perfil.");
      } else if (data) {
        setProfile(data);
        setDisplayName(data.display_name ?? "");
        setUsername(data.username ?? "");
        setAvatarUrl(data.avatar_url ?? "");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = profileSchema.safeParse({
      display_name: displayName,
      username,
      avatar_url: avatarUrl,
    });
    if (!parsed.success) {
      const fe: typeof errors = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as keyof typeof errors;
        if (k && !fe[k]) fe[k] = i.message;
      }
      setErrors(fe);
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: parsed.data.display_name,
        username: parsed.data.username,
        avatar_url: parsed.data.avatar_url || null,
      })
      .eq("user_id", userId);
    setSaving(false);

    if (error) {
      if (/duplicate|unique/i.test(error.message)) {
        setErrors({ username: "Ese alias ya está cogido. Prueba otro." });
      } else {
        toast.error("No pudimos guardar los cambios.");
      }
      return;
    }
    toast.success("Perfil actualizado ✦");
  };

  const initials = (displayName || email || "?").slice(0, 2).toUpperCase();

  return (
    <section className="mt-8 rounded-3xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)] md:p-8">
      <div className="flex items-center gap-5">
        <div
          className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-foreground bg-[color:var(--brand-yellow)] font-display text-2xl font-extrabold"
          style={{ boxShadow: "3px 3px 0 var(--foreground)" }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-extrabold leading-tight">
            {displayName || username || email.split("@")[0]}
          </p>
          {username && (
            <p className="text-sm font-semibold text-[color:var(--brand-blue)]">
              @{username}
            </p>
          )}
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Cargando perfil…</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4">
          <Field
            label="Nombre visible"
            value={displayName}
            onChange={setDisplayName}
            placeholder="Cómo quieres que te vean"
            error={errors.display_name}
          />
          <Field
            label="Alias (@usuario)"
            value={username}
            onChange={setUsername}
            placeholder="alias_sin_espacios"
            error={errors.username}
          />
          <Field
            label="URL de tu avatar"
            value={avatarUrl}
            onChange={setAvatarUrl}
            placeholder="https://… (opcional)"
            error={errors.avatar_url}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-extrabold text-background transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
            {profile?.username && (
              <span className="text-xs text-muted-foreground">@{profile.username}</span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`rounded-xl border-2 bg-background px-4 py-3 text-base outline-none transition focus:border-foreground ${
          error ? "border-[color:var(--brand-coral)]" : "border-border"
        }`}
      />
      {error && (
        <span className="text-xs font-semibold text-[color:var(--brand-coral)]">{error}</span>
      )}
    </label>
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
