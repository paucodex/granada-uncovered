import { Link, useNavigate } from "@tanstack/react-router";
import { VIBES, type Vibe } from "@/lib/events-data";

export type CategoryFilter = Vibe | "Todos";

interface CategoriesProps {
  active?: CategoryFilter;
  onSelect?: (category: CategoryFilter) => void;
  /** Si true, los chips navegan a la página dedicada de cada vibe (/categoria/:slug). */
  asLinks?: boolean;
}

export function Categories({ active = "Todos", onSelect, asLinks = false }: CategoriesProps) {
  const navigate = useNavigate();

  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="mb-5 text-sm font-medium text-muted-foreground">Filtra por vibe →</p>
        <div className="flex flex-wrap gap-3">
          {VIBES.map((c) => {
            const isActive = active === c.name;
            const className = `group flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2.5 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 ${
              isActive ? "-translate-y-0.5 text-background" : "bg-background text-foreground"
            }`;
            const style = {
              boxShadow: isActive ? `2px 2px 0 var(--foreground)` : `4px 4px 0 ${c.color}`,
              backgroundColor: isActive ? c.color : undefined,
            };

            if (asLinks) {
              return (
                <Link
                  key={c.name}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className={className}
                  style={style}
                >
                  <span className="text-lg">{c.emoji}</span>
                  {c.name}
                </Link>
              );
            }

            return (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  if (onSelect) onSelect(c.name);
                  else {
                    navigate({
                      to: "/categoria/$slug",
                      params: { slug: c.slug },
                    });
                  }
                }}
                aria-pressed={isActive}
                className={className}
                style={style}
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
