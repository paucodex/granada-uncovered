const categories = [
  { name: "Cultura", emoji: "🎭", color: "var(--brand-purple)" },
  { name: "Mercadillos", emoji: "🛍️", color: "var(--brand-yellow)" },
  { name: "Música", emoji: "🎶", color: "var(--brand-coral)" },
  { name: "Gratis", emoji: "✨", color: "var(--brand-neon)" },
];

export function Categories() {
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="mb-5 text-sm font-medium text-muted-foreground">Filtra por vibe →</p>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              className="group flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-5 py-2.5 text-base font-bold transition hover:-translate-y-0.5"
              style={{ boxShadow: `4px 4px 0 ${c.color}` }}
            >
              <span className="text-lg">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
