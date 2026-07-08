export const supportedLocales = ["en-US", "es"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const copy = {
  "en-US": {
    appName: "Acento",
    tagline: "Spanish as it is actually spoken.",
    startLesson: "Start lesson",
    practice: "Practice",
    favorite: "Favorite",
  },
  es: {
    appName: "Acento",
    tagline: "Español como se habla de verdad.",
    startLesson: "Empezar lección",
    practice: "Practicar",
    favorite: "Guardar",
  },
} as const;
