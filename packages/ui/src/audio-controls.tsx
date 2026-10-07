"use client";

import { Play, Waves } from "lucide-react";
import { Button } from "./primitives";

export function AudioControls() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 dark:border-white/10 dark:bg-nightSurface">
      <Button aria-label="Audio unavailable" className="h-11 w-11 shrink-0 px-0" disabled>
        <Play className="size-4" />
      </Button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Waves className="size-4 text-sienna" />
          Native recordings coming later
        </div>
        <p className="mt-1 text-xs text-muted">This prototype has no playable audio.</p>
      </div>
    </div>
  );
}
