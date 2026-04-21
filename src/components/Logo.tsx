import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="ENTÉRATE — Inicio"
      className={`font-display font-extrabold tracking-tight text-3xl transition hover:-translate-y-0.5 hover:opacity-90 ${className}`}
    >
      EN<span className="mark-yellow">TÉ</span>RATE
    </Link>
  );
}
