"use client";

import type { DictionaryEntry, Lesson } from "@acento/shared";
import {
  AudioControls,
  Badge,
  BottomNavigation,
  Button,
  Card,
  Input,
  LessonCard,
  type NavigationItem,
  ProgressRing,
} from "@acento/ui";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Heart,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

export function AcentoDashboard({
  lessons,
  dictionary,
}: {
  lessons: Lesson[];
  dictionary: DictionaryEntry[];
}) {
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState<NavigationItem>("Home");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    "common-dominican-expressions",
  );
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [favoriteLessonIds, setFavoriteLessonIds] = useState<Set<string>>(new Set());
  const [practicePromptIndex, setPracticePromptIndex] = useState(0);
  const featured =
    lessons.find((lesson) => lesson.id === "common-dominican-expressions") ?? lessons[0];
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? featured;
  const selectedEntry =
    dictionary.find((entry) => entry.id === selectedEntryId) ??
    dictionary.find((entry) => selectedLesson.relatedDictionaryTerms.includes(entry.id)) ??
    dictionary[0];
  const filteredDictionary = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return dictionary.slice(0, 6);
    }
    return dictionary.filter((entry) =>
      [entry.term, entry.meaning, entry.englishEquivalent, entry.standardSpanishEquivalent]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [dictionary, query]);
  const visibleLessons =
    activeNav === "Practice"
      ? lessons.filter((lesson) => lesson.practicePrompts.length > 0)
      : lessons;

  function toggleFavorite(lesson: Lesson) {
    setFavoriteLessonIds((current) => {
      const next = new Set(current);
      if (next.has(lesson.id)) {
        next.delete(lesson.id);
      } else {
        next.add(lesson.id);
      }
      return next;
    });
  }

  function openLesson(lesson: Lesson) {
    setSelectedLessonId(lesson.id);
    setPracticePromptIndex(0);
    setActiveNav("Learn");
    document
      .getElementById("lesson-detail")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen pb-28">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-ink text-paper shadow-calm dark:bg-paper dark:text-ink">
            A
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Acento
            </div>
            <div className="text-xs text-muted">Spanish as it is spoken</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" onClick={() => setActiveNav("Profile")}>
            Sign in
          </Button>
          <Button onClick={() => setActiveNav("Learn")}>Start free</Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.12fr_0.88fr] lg:py-14">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-5">
            <Badge className="bg-white/60 dark:bg-white/5">
              <Sparkles className="mr-2 size-3" />
              Flagship dialect: Dominican Spanish
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Learn the Spanish people actually use.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted dark:text-white/70">
              Acento teaches standard Spanish, regional speech, pronunciation, culture, and when
              each phrase is appropriate. No cartoon clutter. No unsafe slang without context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["10", "starter lessons"],
              ["14", "Dominican terms"],
              ["50+", "contextual phrases"],
            ].map(([value, label]) => (
              <Card className="p-4" key={label}>
                <div className="text-3xl font-semibold">{value}</div>
                <div className="mt-1 text-sm text-muted">{label}</div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Badge>Daily lesson</Badge>
                <h2 className="mt-3 text-2xl font-semibold">{featured.title}</h2>
              </div>
              <BookOpen className="size-6 text-sienna" />
            </div>
            <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Standard Spanish
              </div>
              <p className="mt-2 text-xl">{featured.streetVsStandard.standard}</p>
              <div className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-sienna">
                Dominican Spanish
              </div>
              <p className="mt-2 text-3xl font-semibold">{featured.streetVsStandard.street}</p>
              <p className="mt-4 leading-7 text-muted dark:text-white/70">
                {featured.streetVsStandard.guidance}
              </p>
            </div>
            <AudioControls />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={() => openLesson(featured)}>
                Practice
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="secondary" onClick={() => toggleFavorite(featured)}>
                <Heart
                  className={
                    favoriteLessonIds.has(featured.id) ? "size-4 fill-sienna text-sienna" : "size-4"
                  }
                />
                {favoriteLessonIds.has(featured.id) ? "Saved" : "Save lesson"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      <section
        id="lesson-detail"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[0.72fr_0.28fr]"
      >
        <Card className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge>{selectedLesson.level}</Badge>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{selectedLesson.title}</h2>
              <p className="mt-2 max-w-2xl leading-7 text-muted dark:text-white/70">
                {selectedLesson.description}
              </p>
            </div>
            <Button variant="secondary" onClick={() => toggleFavorite(selectedLesson)}>
              <Heart
                className={
                  favoriteLessonIds.has(selectedLesson.id)
                    ? "size-4 fill-sienna text-sienna"
                    : "size-4"
                }
              />
              {favoriteLessonIds.has(selectedLesson.id) ? "Saved" : "Favorite"}
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {selectedLesson.phrases.slice(0, 4).map((phrase) => (
              <div
                className="rounded-lg border border-border p-4 dark:border-white/10"
                key={phrase.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>{phrase.formality}</Badge>
                  <Badge>{phrase.slangLevel} slang</Badge>
                </div>
                <div className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Standard Spanish
                </div>
                <p className="mt-1 text-lg">{phrase.standardSpanish}</p>
                <div className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-sienna">
                  Dominican Spanish
                </div>
                <p className="mt-1 text-xl font-semibold">{phrase.regionalSpanish[0]?.text}</p>
                <p className="mt-2 text-sm text-muted dark:text-white/70">{phrase.english}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md bg-paper p-3 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="size-4 text-sea" />
                      Safe with
                    </div>
                    <p className="mt-2 text-sm text-muted dark:text-white/70">
                      {phrase.safeToUseWith.join(", ")}
                    </p>
                  </div>
                  <div className="rounded-md bg-paper p-3 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <XCircle className="size-4 text-sienna" />
                      Avoid with
                    </div>
                    <p className="mt-2 text-sm text-muted dark:text-white/70">
                      {phrase.avoidWith.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-sienna" />
              <h3 className="font-semibold">Practice prompt</h3>
            </div>
            <p className="mt-3 text-lg">{selectedLesson.practicePrompts[practicePromptIndex]}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  setPracticePromptIndex(
                    (current) => (current + 1) % selectedLesson.practicePrompts.length,
                  )
                }
              >
                Next prompt
              </Button>
              <Button variant="secondary" onClick={() => setActiveNav("Conversations")}>
                Open conversation mode
              </Button>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <Badge>Dictionary detail</Badge>
          <h2 className="text-2xl font-semibold">{selectedEntry?.term}</h2>
          <p className="leading-7 text-muted dark:text-white/70">{selectedEntry?.meaning}</p>
          <div className="rounded-md bg-paper p-4 dark:bg-white/5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Example
            </div>
            <p className="mt-2 font-semibold">{selectedEntry?.exampleSentence}</p>
            <p className="mt-1 text-sm text-muted dark:text-white/70">
              {selectedEntry?.englishTranslation}
            </p>
          </div>
          <div className="grid gap-2 text-sm">
            <div>
              <span className="font-medium">Pronunciation:</span> {selectedEntry?.pronunciation}
            </div>
            <div>
              <span className="font-medium">Safe:</span> {selectedEntry?.safeContexts.join(", ")}
            </div>
            <div>
              <span className="font-medium">Risky:</span> {selectedEntry?.riskyContexts.join(", ")}
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[0.7fr_0.3fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Start learning</h2>
              <p className="mt-1 text-sm text-muted">
                Short lessons with standard and regional Spanish.
              </p>
            </div>
            <Button variant="ghost" onClick={() => setActiveNav("Learn")}>
              View all
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleLessons.slice(0, activeNav === "Learn" ? 10 : 6).map((lesson) => (
              <LessonCard
                isFavorite={favoriteLessonIds.has(lesson.id)}
                key={lesson.id}
                lesson={lesson}
                onFavorite={toggleFavorite}
                onStart={openLesson}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="size-4 text-sienna" />
              <h2 className="font-semibold">Dictionary</h2>
            </div>
            <Input
              aria-label="Search dictionary"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search qué lo qué, vaina, guagua..."
              value={query}
            />
            <div className="space-y-3">
              {filteredDictionary.slice(0, 5).map((entry) => (
                <button
                  className="w-full rounded-md border border-border p-3 text-left transition hover:border-sienna hover:bg-paper dark:border-white/10 dark:hover:bg-white/5"
                  key={entry.id}
                  onClick={() => {
                    setSelectedEntryId(entry.id);
                    setActiveNav("Dictionary");
                    document
                      .getElementById("lesson-detail")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold">{entry.term}</div>
                    <Badge>{entry.formality}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted dark:text-white/70">{entry.meaning}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-5">
            <div className="flex items-center gap-2">
              <Globe2 className="size-4 text-sea" />
              <h2 className="font-semibold">Progress</h2>
            </div>
            <ProgressRing label="Listening score" value={42} />
            <ProgressRing label="Regional exposure" value={28} />
            <ProgressRing label="Conversation confidence" value={35} />
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-sienna" />
              <h2 className="font-semibold">Context first</h2>
            </div>
            <p className="text-sm leading-6 text-muted dark:text-white/70">
              Every phrase shows formality, slang level, safe contexts, avoid-with guidance, and
              cultural notes before practice begins.
            </p>
          </Card>
        </aside>
      </section>

      <BottomNavigation active={activeNav} onSelect={setActiveNav} />
    </main>
  );
}
