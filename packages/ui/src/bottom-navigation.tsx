import { Bookmark, Home, Search, Target, User } from "lucide-react";

const items = [
  ["Today", Home],
  ["Practice", Target],
  ["Saved", Bookmark],
  ["Dictionary", Search],
  ["Profile", User],
] as const;

export type NavigationItem = (typeof items)[number][0];

export function BottomNavigation({
  active = "Today",
  onSelect,
}: {
  active?: NavigationItem;
  onSelect?: (item: NavigationItem) => void;
}) {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-lg justify-between rounded-lg border border-border bg-surface/95 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-nightSurface/95">
      {items.map(([label, Icon]) => (
        <button
          className={
            active === label
              ? "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md bg-ink px-2 py-2 text-xs text-paper transition dark:bg-paper dark:text-ink"
              : "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-2 py-2 text-xs text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10 dark:hover:text-paper"
          }
          key={label}
          onClick={() => onSelect?.(label)}
        >
          <Icon className="size-4" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
