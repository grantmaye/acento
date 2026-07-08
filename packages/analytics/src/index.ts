export type AnalyticsEvent =
  | { name: "lesson_started"; lessonId: string; dialect: string }
  | { name: "lesson_completed"; lessonId: string; durationSeconds: number }
  | { name: "phrase_favorited"; phraseId: string }
  | { name: "dictionary_searched"; query: string }
  | { name: "practice_started"; mode: "phrase_trainer" | "pronunciation" | "conversation" };

export interface AnalyticsClient {
  track(event: AnalyticsEvent): void;
}

export const consoleAnalytics: AnalyticsClient = {
  track(event) {
    if (globalThis.location?.hostname === "localhost") {
      console.info("[analytics]", event);
    }
  },
};
