import { createFileRoute, redirect } from "@tanstack/react-router";

// Categorías ahora viven dentro de /explorar?vibe=:slug.
// Mantenemos esta ruta como redirect para no romper enlaces antiguos.
export const Route = createFileRoute("/categoria/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/explorar",
      search: { vibe: params.slug === "todos" ? undefined : params.slug },
    });
  },
});
