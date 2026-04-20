import { Search } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Logo />
        <nav className="flex items-center gap-2 md:gap-6 text-sm font-medium">
          <a href="#explorar" className="hidden sm:inline-block hover:text-[color:var(--brand-blue)] transition-colors">
            Explorar
          </a>
          <a
            href="#subir"
            className="rounded-full border border-foreground bg-foreground px-4 py-2 text-background transition hover:-translate-y-0.5"
          >
            Subir plan
          </a>
          <button
            aria-label="Buscar"
            className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-foreground transition"
          >
            <Search className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </header>
  );
}
