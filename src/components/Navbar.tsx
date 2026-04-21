import { LogOut, Search, User as UserIcon, Bookmark, Plus } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";
import { useAuth } from "@/auth/AuthProvider";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/explorar", search: { q: query, vibe: "todos" } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3.5 md:px-8 md:gap-6">
        <Logo />

        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          <Link
            to="/explorar"
            search={{ q: "", vibe: "todos" }}
            className="text-muted-foreground hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Explorar
          </Link>
        </nav>

        <form
          onSubmit={onSearch}
          className="group relative hidden flex-1 items-center gap-2 rounded-full border border-foreground bg-background px-4 py-1.5 shadow-[3px_3px_0_0_oklch(0.2_0_0)] transition focus-within:-translate-y-0.5 focus-within:shadow-[4px_4px_0_0_oklch(0.2_0_0)] sm:flex md:max-w-xl"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca conciertos, mercadillos…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="hidden shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background sm:inline-block"
          >
            Buscar
          </button>
        </form>

        <Link
          to="/crear"
          className="hidden items-center gap-1.5 rounded-full bg-[color:var(--brand-yellow)] px-3.5 py-2 text-sm font-bold text-foreground transition hover:-translate-y-0.5 sm:inline-flex"
        >
          <Plus className="h-4 w-4" /> Subir
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
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-foreground"
              >
                <UserIcon className="h-4 w-4" />
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
