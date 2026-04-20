import { createContext, useContext, useState, type ReactNode } from "react";
import type { EventCategory } from "@/components/EventCard";

export type CategoryFilter = EventCategory | "Todos";

interface CategoryFilterContextValue {
  active: CategoryFilter;
  setActive: (c: CategoryFilter) => void;
}

const CategoryFilterContext = createContext<CategoryFilterContextValue | undefined>(undefined);

export function CategoryFilterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<CategoryFilter>("Todos");
  return (
    <CategoryFilterContext.Provider value={{ active, setActive }}>
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  const ctx = useContext(CategoryFilterContext);
  if (!ctx) throw new Error("useCategoryFilter must be used within CategoryFilterProvider");
  return ctx;
}
