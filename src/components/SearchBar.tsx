import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section
      aria-label="Buscar eventos"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="group relative flex items-center gap-3 rounded-full border-2 border-foreground bg-background px-5 py-3 shadow-[4px_4px_0_0_oklch(0.2_0_0)] transition focus-within:-translate-y-0.5 focus-within:shadow-[6px_6px_0_0_oklch(0.2_0_0)] md:px-7 md:py-4"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca conciertos, mercadillos, exposiciones…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-lg"
          />
          <button
            type="submit"
            className="hidden shrink-0 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:-translate-y-0.5 sm:inline-block"
          >
            Buscar
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Descubre lo que está pasando en Granada — aunque no salga en Google.
        </p>
      </div>
    </section>
  );
}
