import { BookOpen, Home, Library, MessageCircle, Search, TrendingUp, User } from "lucide-react";

const items = [
  ["Home", Home],
  ["Learn", BookOpen],
  ["Practice", TrendingUp],
  ["Dictionary", Search],
  ["Conversations", MessageCircle],
  ["Progress", Library],
  ["Profile", User],
] as const;

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-3xl justify-between rounded-lg border border-border bg-surface/90 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-nightSurface/90">
      {items.map(([label, Icon]) => (
        <button
          className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-2 py-2 text-xs text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10 dark:hover:text-paper"
          key={label}
        >
          <Icon className="size-4" />
          <span className="hidden sm:block">{label}</span>
        </button>
      ))}
    </nav>
  );
}
