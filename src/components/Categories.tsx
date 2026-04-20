import type { EventCategory } from "@/components/EventCard";

export type CategoryFilter = EventCategory | "Todos";

const categories: { name: CategoryFilter; emoji: string; color: string }[] = [
  { name: "Todos", emoji: "✺", color: "var(--brand-blue)" },
  { name: "Cultura", emoji: "🎭", color: "var(--brand-purple)" },
  { name: "Mercadillos", emoji: "🛍️", color: "var(--brand-yellow)" },
  { name: "Música", emoji: "🎶", color: "var(--brand-coral)" },
  { name: "Gratis", emoji: "✨", color: "var(--brand-neon)" },
];

interface CategoriesProps {
  active: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

export function Categories({ active, onSelect }: CategoriesProps) {
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="mb-5 text-sm font-medium text-muted-foreground">Filtra por vibe →</p>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => {
            const isActive = active === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelect(c.name)}
                aria-pressed={isActive}
                className={`group flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2.5 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive ? "-translate-y-0.5 text-background" : "bg-background text-foreground"
                }`}
                style={{
                  boxShadow: isActive ? `2px 2px 0 var(--foreground)` : `4px 4px 0 ${c.color}`,
                  backgroundColor: isActive ? c.color : undefined,
                }}
              >
                <span className="text-lg">{c.emoji}</span>
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
