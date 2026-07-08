"use client";

import { Download, Gauge, Mic2, Pause, Play, Volume2, Waves } from "lucide-react";
import { useState } from "react";
import { Button } from "./primitives";

export function AudioControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<"0.75x" | "1x">("1x");
  const [voice, setVoice] = useState<"male" | "female">("male");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface p-2 dark:border-white/10 dark:bg-nightSurface">
      <Button
        aria-label={isPlaying ? "Pause audio" : "Play native speed audio"}
        className="h-9 w-9 px-0"
        onClick={() => setIsPlaying((current) => !current)}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <div className="mx-2 flex h-8 min-w-32 flex-1 items-center gap-1 text-sienna">
        <Waves className="size-4" />
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-border dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sienna via-plantain to-sea transition-all"
            style={{ width: isPlaying ? "66%" : "18%" }}
          />
        </div>
      </div>
      <Button
        aria-label="Toggle playback speed"
        variant={speed === "0.75x" ? "secondary" : "ghost"}
        className="h-9 px-2"
        onClick={() => setSpeed((current) => (current === "1x" ? "0.75x" : "1x"))}
      >
        <Gauge className="size-4" />
        {speed}
      </Button>
      <Button
        aria-label="Toggle voice"
        variant={voice === "female" ? "secondary" : "ghost"}
        className="h-9 px-2"
        onClick={() => setVoice((current) => (current === "male" ? "female" : "male"))}
      >
        <Volume2 className="size-4" />
        {voice}
      </Button>
      <Button
        aria-label="Record pronunciation"
        variant={isRecording ? "secondary" : "ghost"}
        className="h-9 w-9 px-0"
        onClick={() => setIsRecording((current) => !current)}
      >
        <Mic2 className="size-4" />
      </Button>
      <Button
        aria-label="Download offline audio"
        variant={isDownloaded ? "secondary" : "ghost"}
        className="h-9 w-9 px-0"
        onClick={() => setIsDownloaded(true)}
      >
        <Download className="size-4" />
      </Button>
    </div>
  );
}
