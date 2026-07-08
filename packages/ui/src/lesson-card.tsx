import type { Lesson } from "@acento/shared";
import { BookOpen, Heart, Play } from "lucide-react";
import { Badge, Button, Card } from "./primitives";

export function LessonCard({
  isFavorite = false,
  lesson,
  onFavorite,
  onStart,
}: {
  isFavorite?: boolean;
  lesson: Lesson;
  onFavorite?: (lesson: Lesson) => void;
  onStart?: (lesson: Lesson) => void;
}) {
  const firstPhrase = lesson.phrases[0];

  return (
    <Card className="flex h-full flex-col justify-between gap-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge>{lesson.category}</Badge>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{lesson.title}</h3>
          </div>
          <button
            aria-label={`Favorite ${lesson.title}`}
            className="rounded-md p-2 text-muted transition hover:bg-ink/5 hover:text-sienna dark:hover:bg-white/10"
            onClick={() => onFavorite?.(lesson)}
          >
            <Heart className={isFavorite ? "size-4 fill-sienna text-sienna" : "size-4"} />
          </button>
        </div>
        <p className="text-sm leading-6 text-muted dark:text-white/70">{lesson.description}</p>
        <div className="rounded-md bg-paper p-4 dark:bg-white/5">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Standard</div>
          <p className="mt-1 text-base">{firstPhrase.standardSpanish}</p>
          <div className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-sienna">
            Dominican
          </div>
          <p className="mt-1 text-lg font-semibold">{firstPhrase.regionalSpanish[0]?.text}</p>
          <p className="mt-2 text-sm text-muted dark:text-white/70">{firstPhrase.english}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <BookOpen className="size-4" />
          {lesson.estimatedMinutes} min
        </div>
        <Button onClick={() => onStart?.(lesson)}>
          <Play className="size-4" />
          Start
        </Button>
      </div>
    </Card>
  );
}
