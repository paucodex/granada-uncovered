import { LogOut, Search, User as UserIcon, Bookmark, Plus } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";
import { useAuth } from "@/auth/AuthProvider";
import { useProfile, profileLabel } from "@/auth/useProfile";

export function Navbar() {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const label = profileLabel(profile, user?.email);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/explorar", search: { q: query || undefined } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:gap-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          <Link
            to="/explorar"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-full px-3 py-1.5 bg-muted text-foreground font-semibold" }}
          >
            Explorar
          </Link>
        </nav>

        <form
          onSubmit={onSearch}
          className="relative hidden flex-1 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 transition focus-within:border-foreground focus-within:bg-background sm:flex md:max-w-sm"
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar planes…"
            className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>

        <Link
          to="/crear"
          className="hidden items-center gap-1.5 rounded-full bg-[color:var(--brand-yellow)] px-3.5 py-2 text-sm font-bold text-foreground transition hover:-translate-y-0.5 sm:inline-flex"
        >
          <Plus className="h-4 w-4" /> Subir plan
        </Link>

        <nav className="flex items-center gap-1.5 text-sm font-medium md:gap-2">
          {user ? (
            <>
              <Link
                to="/guardados"
                aria-label="Guardados"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-foreground"
              >
                <Bookmark className="h-4 w-4" />
              </Link>
              <Link
                to="/perfil"
                aria-label="Perfil"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-2.5 hover:border-foreground"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden max-w-[120px] truncate text-xs font-semibold sm:inline">
                  {label}
                </span>
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/" });
                }}
                aria-label="Salir"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                search={{ redirect: "/" }}
                className="rounded-full px-3 py-2 hover:bg-muted"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                search={{ redirect: "/" }}
                className="rounded-full bg-foreground px-4 py-2 text-background transition hover:-translate-y-0.5"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
