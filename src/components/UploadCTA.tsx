import { Link } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";

export function UploadCTA() {
  const { user } = useAuth();
  return (
    <section
      id="subir"
      className="relative overflow-hidden border-y border-border bg-foreground py-20 text-background"
    >
      <div className="absolute -left-10 top-10 h-40 w-40 rotate-12 rounded-full bg-[color:var(--brand-coral)] opacity-70 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[color:var(--brand-blue)] opacity-60 blur-3xl" />

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
