export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`font-display font-extrabold tracking-tight text-3xl ${className}`}>
      EN<span className="mark-yellow">TÉ</span>RATE
    </a>
  );
}
