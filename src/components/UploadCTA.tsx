import { Link } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";

export function UploadCTA() {
  const { user } = useAuth();
  return (
    <section
      id="subir"
      className="relative overflow-hidden border-y border-border py-20 text-background"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-coral) 100%)",
      }}
    >
      {/* Soft color blobs */}
      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-[color:var(--brand-purple)] opacity-60 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[color:var(--brand-blue)] opacity-55 blur-3xl" />
      <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-[color:var(--brand-coral)] opacity-55 blur-3xl" />
      <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[color:var(--brand-yellow)] opacity-50 blur-3xl" />

      {/* Grain noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <span className="inline-block rotate-[-3deg] rounded-full bg-[color:var(--brand-yellow)] px-3 py-1 text-xs font-extrabold uppercase text-foreground">
          tu turno
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1] md:text-5xl">
          ¿Te has enterado de algo
          <br />
          que{" "}
          <span className="italic underline decoration-[color:var(--brand-yellow)] decoration-4 underline-offset-8">
            el resto no
          </span>
          ?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-background/70 md:text-lg">
          Súbelo. Seguro que alguien más quiere saberlo.
        </p>
        <Link
          to="/auth"
          search={{ mode: user ? "login" : "signup", redirect: "/" }}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-yellow)] px-7 py-3.5 text-base font-extrabold text-foreground transition hover:-translate-y-1"
        >
          {user ? "Subir un plan" : "Contarlo →"}
        </Link>
        {!user && (
          <p className="mt-3 text-xs text-background/50">
            Necesitas una cuenta para subir planes (es gratis)
          </p>
        )}
      </div>
    </section>
  );
}
