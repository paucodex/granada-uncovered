import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display font-extrabold tracking-tight text-3xl ${className}`}>
      EN<span className="mark-yellow">TÉ</span>RATE
    </Link>
  );
}
