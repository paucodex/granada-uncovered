import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";
import { useProfile, notifyProfileChanged, profileLabel } from "@/auth/useProfile";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/perfil")({
  component: PerfilPage,
  head: () => ({ meta: [{ title: "Mi perfil — ENTÉRATE" }] }),
});

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

const emailSchema = z.string().trim().email("Ese email no parece válido").max(255);
const passwordSchema = z.string().min(6, "Mínimo 6 caracteres").max(72, "Máximo 72 caracteres");

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

        <AccountSettings currentEmail={user.email ?? ""} />

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

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => signOut()}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground"
          >
            Cerrar sesión
          </button>
          <DeleteAccountButton onAfterDelete={signOut} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DeleteAccountButton({ onAfterDelete }: { onAfterDelete: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("delete-account");
      if (error) {
        toast.error("No pudimos eliminar la cuenta. Inténtalo otra vez.");
        setDeleting(false);
        return;
      }
      await onAfterDelete().catch(() => {});
      toast.success("Cuenta eliminada");
      navigate({ to: "/" });
    } catch {
      toast.error("No pudimos eliminar la cuenta. Inténtalo otra vez.");
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-[color:var(--brand-coral)] px-5 py-2.5 text-sm font-semibold text-[color:var(--brand-coral)] hover:bg-[color:var(--brand-coral)] hover:text-background"
      >
        Eliminar cuenta
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4"
          onClick={() => !deleting && setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl font-extrabold">¿Eliminar tu cuenta?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Esta acción es permanente. Perderás el acceso al instante y no podrás recuperar tu cuenta.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-[color:var(--brand-coral)] px-5 py-2.5 text-sm font-extrabold text-background transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {deleting ? "Eliminando…" : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProfileForm({ userId, email }: { userId: string; email: string }) {
  const { profile, loading, refresh } = useProfile();
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"display_name" | "username" | "avatar_url", string>>>({});

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setUsername(profile.username ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

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
    await refresh();
    notifyProfileChanged();
    toast.success("Perfil actualizado ✦");
  };

  const visibleLabel = profileLabel(
    { ...(profile ?? { id: "", user_id: userId, display_name: null, username: null, avatar_url: null }), display_name: displayName || profile?.display_name || null, username: username || profile?.username || null },
    email,
  );
  const initials = (visibleLabel || "?").slice(0, 2).toUpperCase();

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("El archivo tiene que ser una imagen.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Máximo 3 MB.");
      return;
    }
    setUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${userId}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });
    if (upErr) {
      setUploading(false);
      toast.error("No pudimos subir la imagen.");
      return;
    }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = pub.publicUrl;
    const { error: updErr } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", userId);
    setUploading(false);
    if (updErr) {
      toast.error("Imagen subida, pero no pudimos guardarla en tu perfil.");
      return;
    }
    setAvatarUrl(publicUrl);
    await refresh();
    notifyProfileChanged();
    toast.success("Avatar actualizado ✦");
  };

  return (
    <section className="mt-8 rounded-3xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)] md:p-8">
      <div className="flex items-center gap-5">
        <div
          className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-foreground bg-[color:var(--brand-yellow)] font-display text-2xl font-extrabold"
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
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl font-extrabold leading-tight">
            {visibleLabel}
          </p>
          {(username || profile?.username) && (
            <p className="text-sm font-semibold text-[color:var(--brand-blue)]">
              @{username || profile?.username}
            </p>
          )}
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{email}</p>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleAvatarUpload(f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Subiendo…" : avatarUrl ? "Cambiar avatar" : "Subir avatar"}
            </button>
          </div>
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
          {/* URL de avatar oculta — la subida directa es la vía principal.
              Se mantiene en estado por si se necesita como fallback interno. */}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-extrabold text-background transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function AccountSettings({ currentEmail }: { currentEmail: string }) {
  // Email
  const [email, setEmail] = useState(currentEmail);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [emailSaving, setEmailSaving] = useState(false);

  // Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [pwdSaving, setPwdSaving] = useState(false);

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setEmailErr(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailErr(parsed.error.issues[0]?.message ?? "Email inválido");
      return;
    }
    if (parsed.data === currentEmail) {
      setEmailErr("Ese ya es tu email actual.");
      return;
    }
    setEmailSaving(true);
    const { error } = await supabase.auth.updateUser({ email: parsed.data });
    setEmailSaving(false);
    if (error) {
      const m = error.message.toLowerCase();
      if (m.includes("already") || m.includes("registered") || m.includes("exists")) {
        setEmailErr("Ese email ya está en uso por otra cuenta.");
      } else if (m.includes("invalid")) {
        setEmailErr("El email no parece válido.");
      } else {
        setEmailErr(error.message);
      }
      return;
    }
    toast.success("Te hemos enviado un correo para confirmar el nuevo email.");
  };

  const handlePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdErr(null);
    const parsed = passwordSchema.safeParse(newPassword);
    if (!parsed.success) {
      setPwdErr(parsed.error.issues[0]?.message ?? "Contraseña inválida");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdErr("Las contraseñas no coinciden.");
      return;
    }
    setPwdSaving(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data });
    setPwdSaving(false);
    if (error) {
      const m = error.message.toLowerCase();
      if (m.includes("same") || m.includes("different")) {
        setPwdErr("La nueva contraseña tiene que ser distinta de la actual.");
      } else if (m.includes("weak") || m.includes("at least")) {
        setPwdErr("Esa contraseña es demasiado débil.");
      } else {
        setPwdErr(error.message);
      }
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Contraseña actualizada ✦");
  };

  return (
    <section className="mt-10 rounded-3xl border-2 border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-2xl font-extrabold">Ajustes de cuenta</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Cambia tu email o tu contraseña. Estos cambios afectan a tu acceso.
      </p>

      <form onSubmit={handleEmail} noValidate className="mt-6 grid gap-3">
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="tu@email.com"
          error={emailErr ?? undefined}
        />
        <div>
          <button
            type="submit"
            disabled={emailSaving}
            className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background disabled:opacity-60"
          >
            {emailSaving ? "Enviando…" : "Cambiar email"}
          </button>
        </div>
      </form>

      <div className="my-8 h-px bg-border" />

      <form onSubmit={handlePassword} noValidate className="grid gap-3">
        <Field
          label="Nueva contraseña"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Mínimo 6 caracteres"
          error={pwdErr ?? undefined}
        />
        <Field
          label="Repite la nueva contraseña"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Otra vez, pa' confirmar"
        />
        <div>
          <button
            type="submit"
            disabled={pwdSaving}
            className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background disabled:opacity-60"
          >
            {pwdSaving ? "Guardando…" : "Cambiar contraseña"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
