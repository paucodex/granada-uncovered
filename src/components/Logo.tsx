export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`font-display text-2xl font-extrabold tracking-tight ${className}`}>
      EN<span className="mark-yellow">TÉ</span>RATE
    </a>
  );
}
