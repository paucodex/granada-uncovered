import { LogOut, Search } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { useAuth } from "@/auth/AuthProvider";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <Logo />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="group relative mx-2 hidden flex-1 items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-1.5 shadow-[3px_3px_0_0_oklch(0.2_0_0)] transition focus-within:-translate-y-0.5 focus-within:shadow-[4px_4px_0_0_oklch(0.2_0_0)] sm:flex md:max-w-md"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca conciertos, mercadillos…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>

        <nav className="flex items-center gap-1.5 text-sm font-medium md:gap-3">
          {user ? (
            <>
              <span className="hidden text-xs text-muted-foreground md:inline">
                {user.email?.split("@")[0]}
              </span>
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
                to="/auth"
                search={{ mode: "login", redirect: "/" }}
                className="rounded-full px-3 py-2 hover:bg-muted"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup", redirect: "/" }}
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
