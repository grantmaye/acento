import { Download, Gauge, Mic2, Pause, Play, Volume2, Waves } from "lucide-react";
import { Button } from "./primitives";

export function AudioControls() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface p-2 dark:border-white/10 dark:bg-nightSurface">
      <Button aria-label="Play native speed audio" className="h-9 w-9 px-0">
        <Play className="size-4" />
      </Button>
      <Button aria-label="Pause audio" variant="secondary" className="h-9 w-9 px-0">
        <Pause className="size-4" />
      </Button>
      <div className="mx-2 flex h-8 min-w-32 flex-1 items-center gap-1 text-sienna">
        <Waves className="size-4" />
        <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-sienna via-plantain to-sea" />
      </div>
      <Button aria-label="Slow playback" variant="ghost" className="h-9 px-2">
        <Gauge className="size-4" />
        0.75x
      </Button>
      <Button aria-label="Male voice" variant="ghost" className="h-9 w-9 px-0">
        <Volume2 className="size-4" />
      </Button>
      <Button aria-label="Record pronunciation" variant="ghost" className="h-9 w-9 px-0">
        <Mic2 className="size-4" />
      </Button>
      <Button aria-label="Download offline audio" variant="ghost" className="h-9 w-9 px-0">
        <Download className="size-4" />
      </Button>
    </div>
  );
}
