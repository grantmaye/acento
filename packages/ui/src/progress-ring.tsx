export function ProgressRing({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid size-14 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#a6532f ${clamped * 3.6}deg, rgba(166,83,47,0.12) 0deg)`,
        }}
      >
        <div className="grid size-10 place-items-center rounded-full bg-surface text-xs font-semibold dark:bg-night">
          {clamped}%
        </div>
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted">Measured by practice quality</div>
      </div>
    </div>
  );
}
