import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/auth/AuthProvider";
import { VIBES, type Vibe, type SourceType, type AppEvent } from "@/lib/events-data";
import { saveUserEvent, slugify } from "@/lib/user-events";

export const Route = createFileRoute("/crear")({
  component: CrearPage,
  head: () => ({ meta: [{ title: "Subir un plan — ENTÉRATE" }] }),
});

const VIBE_OPTIONS: Vibe[] = VIBES.filter((v) => v.name !== "Todos").map(
  (v) => v.name as Vibe,
);
const SOURCE_OPTIONS: SourceType[] = ["Instagram", "TikTok", "Web", "Cartel", "Boca a boca"];

const eventSchema = z.object({
  title: z.string().trim().min(4, "Mínimo 4 caracteres").max(120, "Máximo 120 caracteres"),
  description: z
    .string()
    .trim()
    .min(20, "Cuéntanos algo más (mínimo 20)")
    .max(800, "Máximo 800 caracteres"),
  date: z.string().min(1, "Elige una fecha"),
  time: z.string().min(1, "Elige una hora"),
  location: z.string().trim().min(2, "Indica el sitio").max(120),
  district: z.string().trim().min(2, "Indica el barrio").max(80),
  mainCategory: z.enum(VIBE_OPTIONS as [Vibe, ...Vibe[]]),
  tags: z.array(z.enum(VIBE_OPTIONS as [Vibe, ...Vibe[]])).max(4, "Máximo 4 tags"),
  image: z.string().trim().url("URL de imagen no válida").or(z.literal("")),
  sourceType: z.enum(SOURCE_OPTIONS as [SourceType, ...SourceType[]]),
  sourceUrl: z.string().trim().url("URL no válida").optional().or(z.literal("")),
  isPublic: z.literal(true, {
    errorMap: () => ({ message: "Confirma que el plan es público" }),
  }),
});

type FormErrors = Partial<Record<keyof z.infer<typeof eventSchema>, string>>;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80";

function formatHumanDate(iso: string): string {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

function CrearPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [mainCategory, setMainCategory] = useState<Vibe>("Cultura");
  const [tags, setTags] = useState<Vibe[]>([]);
  const [image, setImage] = useState("");
  const [sourceType, setSourceType] = useState<SourceType>("Boca a boca");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (t: Vibe) => {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t].slice(0, 4),
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrors({});

    const payload = {
      title,
      description,
      date,
      time,
      location,
      district,
      mainCategory,
      tags,
      image,
      sourceType,
      sourceUrl,
      isPublic,
    };
    const parsed = eventSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Revisa los campos marcados");
      return;
    }

    setSubmitting(true);
    try {
      const id = `u_${Date.now().toString(36)}`;
      const finalTags = parsed.data.tags.includes(parsed.data.mainCategory)
        ? parsed.data.tags
        : [parsed.data.mainCategory, ...parsed.data.tags];

      const event: AppEvent = {
        id,
        slug: slugify(parsed.data.title) + "-" + id.slice(2, 8),
        title: parsed.data.title,
        description: parsed.data.description,
        image: parsed.data.image || FALLBACK_IMAGE,
        date: formatHumanDate(parsed.data.date),
        time: parsed.data.time,
        location: parsed.data.location,
        district: parsed.data.district,
        mainCategory: parsed.data.mainCategory,
        tags: finalTags,
        priceType: "Gratis",
        sourceType: parsed.data.sourceType,
        sourceUrl: parsed.data.sourceUrl || undefined,
        attendeesCount: 1,
        createdBy: user.id,
        status: "approved",
      };

      saveUserEvent(event);
      toast.success("¡Plan publicado!");
      navigate({ to: "/evento/$id", params: { id: event.id } });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
          <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
            tu turno
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            ¿Has visto algo? <span className="mark-yellow">Súbelo</span>
          </h1>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center">
            <p className="text-base">Necesitas una cuenta para subir planes (¡es gratis!)</p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                to="/login"
                search={{ redirect: "/crear" }}
                className="rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-sm font-semibold"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                search={{ redirect: "/crear" }}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
        <span className="inline-block rotate-[-2deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase">
          tu turno
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          ¿Te has <span className="mark-yellow">enterao</span> de algo? Compártelo
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Si tú lo sabes, alguien más quiere saberlo.
        </p>
        <div className="mt-4 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 py-3 text-sm">
          <strong className="font-bold">Solo planes abiertos al público.</strong>{" "}
          <span className="text-muted-foreground">Nada de eventos privados.</span>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <Field label="Título" error={errors.title}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Concierto en la Carbonería"
              className={inputCls(!!errors.title)}
            />
          </Field>

          <Field label="Descripción" error={errors.description}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="¿Qué es? ¿Por qué merece la pena? ¿Qué hay que llevar?"
              className={inputCls(!!errors.description)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Fecha" error={errors.date}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls(!!errors.date)}
              />
            </Field>
            <Field label="Hora" error={errors.time}>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputCls(!!errors.time)}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Sitio" error={errors.location}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Bar La Tertulia"
                className={inputCls(!!errors.location)}
              />
            </Field>
            <Field label="Barrio / zona" error={errors.district}>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Ej: Realejo"
                className={inputCls(!!errors.district)}
              />
            </Field>
          </div>

          <Field label="Categoría principal" error={errors.mainCategory}>
            <select
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value as Vibe)}
              className={inputCls(false)}
            >
              {VIBE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tags (máx. 4)" error={errors.tags}>
            <div className="flex flex-wrap gap-2">
              {VIBE_OPTIONS.map((v) => {
                const active = tags.includes(v);
                return (
                  <button
                    type="button"
                    key={v}
                    onClick={() => toggleTag(v)}
                    className={`rounded-full border-2 px-3 py-1 text-xs font-semibold transition ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Imagen (URL)" error={errors.image} hint="Pega un enlace a una imagen. Si lo dejas vacío, ponemos una por defecto.">
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
              className={inputCls(!!errors.image)}
            />
          </Field>

          <Field label="¿De dónde lo has sacado?" error={errors.sourceType}>
            <div className="flex flex-wrap gap-2">
              {SOURCE_OPTIONS.map((s) => {
                const active = sourceType === s;
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSourceType(s)}
                    className={`rounded-full border-2 px-3 py-1 text-xs font-semibold transition ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Enlace de la fuente (opcional)" error={errors.sourceUrl}>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://instagram.com/…"
              className={inputCls(!!errors.sourceUrl)}
            />
          </Field>

          <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
            <Link to="/explorar" className="text-sm text-muted-foreground hover:text-foreground">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:-translate-y-0.5 transition disabled:opacity-60"
            >
              {submitting ? "Publicando…" : "Publicar plan →"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border-2 bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground ${
    hasError ? "border-[color:var(--destructive,#ef4444)]" : "border-border"
  }`;
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-medium text-[color:var(--destructive,#ef4444)]">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}
