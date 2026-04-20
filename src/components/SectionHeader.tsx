import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  children,
  cta,
}: {
  eyebrow?: string;
  children: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-foreground" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-extrabold leading-[1] tracking-tight md:text-5xl">
          {children}
        </h2>
      </div>
      {cta}
    </div>
  );
}
