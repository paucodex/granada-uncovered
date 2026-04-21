import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section
      aria-label="Buscar eventos"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-2xl px-4 py-4 md:px-6 md:py-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="group relative flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-2 shadow-[3px_3px_0_0_oklch(0.2_0_0)] transition focus-within:-translate-y-0.5 focus-within:shadow-[4px_4px_0_0_oklch(0.2_0_0)]"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca conciertos, mercadillos, exposiciones…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="hidden shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background transition hover:-translate-y-0.5 sm:inline-block"
          >
            Buscar
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Descubre lo que está pasando en Granada — aunque no salga en Google.
        </p>
      </div>
    </section>
  );
}
