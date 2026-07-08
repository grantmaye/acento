"use client";

import { Pause, Play, Waves } from "lucide-react";
import { useState } from "react";
import { Button } from "./primitives";

export function AudioControls({ onPlay }: { onPlay?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 dark:border-white/10 dark:bg-nightSurface">
      <Button
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="h-11 w-11 shrink-0 px-0"
        onClick={() => {
          setIsPlaying((current) => !current);
          onPlay?.();
        }}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Waves className="size-4 text-sienna" />
          Native audio placeholder
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-border dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sienna via-plantain to-sea transition-all"
            style={{ width: isPlaying ? "72%" : "22%" }}
          />
        </div>
      </div>
    </div>
  );
}
