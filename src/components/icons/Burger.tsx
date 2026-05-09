export function Burger({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <g stroke="var(--text)" strokeLinecap="round" strokeWidth="2">
        <path d="M4 18h16M4 12h16M4 6h16"/>
      </g>
    </svg>
  );
}
