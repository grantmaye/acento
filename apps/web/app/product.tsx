"use client";

import type { DictionaryEntry, Formality, Lesson, SlangLevel } from "@acento/shared";
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
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Filter,
  Globe2,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type DictionaryFormalityFilter = "all" | Formality;
type DictionarySlangFilter = "all" | SlangLevel;

const navAnchors: Record<NavigationItem, string> = {
  Home: "home",
  Learn: "learn",
  Practice: "practice",
  Dictionary: "dictionary",
  Conversations: "conversations",
  Progress: "progress",
  Profile: "profile",
};

const levels = ["beginner", "elementary", "intermediate", "advanced"] as const;
const goals = ["travel", "dating", "business", "family", "friends", "heritage"] as const;
const dialects = ["Dominican", "Puerto Rican", "Mexican", "Colombian", "Spain"] as const;

export function AcentoDashboard({
  lessons,
  dictionary,
}: {
  lessons: Lesson[];
  dictionary: DictionaryEntry[];
}) {
  const featured =
    lessons.find((lesson) => lesson.id === "common-dominican-expressions") ?? lessons[0];

  const [activeNav, setActiveNav] = useState<NavigationItem>("Home");
  const [selectedLessonId, setSelectedLessonId] = useState(featured.id);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [formalityFilter, setFormalityFilter] = useState<DictionaryFormalityFilter>("all");
  const [slangFilter, setSlangFilter] = useState<DictionarySlangFilter>("all");
  const [favoriteLessonIds, setFavoriteLessonIds] = useState<Set<string>>(new Set());
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [completedPhraseIds, setCompletedPhraseIds] = useState<Set<string>>(new Set());
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [practicePromptIndex, setPracticePromptIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [conversationMessage, setConversationMessage] = useState("");
  const [conversationLog, setConversationLog] = useState([
    {
      speaker: "Acento",
      text: "Taxi driver mode is ready. Practice asking how much the ride costs, where the stop is, or whether the route passes near the hotel.",
    },
  ]);
  const [profile, setProfile] = useState({
    level: "beginner",
    goal: "travel",
    dialect: "Dominican",
    dailyMinutes: 15,
  });

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? featured;
  const currentPhrase = selectedLesson.phrases[phraseIndex] ?? selectedLesson.phrases[0];
  const currentFlashcard =
    selectedLesson.flashcards[flashcardIndex] ?? selectedLesson.flashcards[0];
  const selectedEntry =
    dictionary.find((entry) => entry.id === selectedEntryId) ??
    dictionary.find((entry) => selectedLesson.relatedDictionaryTerms.includes(entry.id)) ??
    dictionary[0];

  const favoriteLessons = lessons.filter((lesson) => favoriteLessonIds.has(lesson.id));
  const filteredDictionary = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return dictionary.filter((entry) => {
      const matchesText =
        !normalized ||
        [
          entry.term,
          entry.meaning,
          entry.englishEquivalent,
          entry.standardSpanishEquivalent,
          entry.region,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesFormality = formalityFilter === "all" || entry.formality === formalityFilter;
      const matchesSlang = slangFilter === "all" || entry.slangLevel === slangFilter;
      return matchesText && matchesFormality && matchesSlang;
    });
  }, [dictionary, formalityFilter, query, slangFilter]);

  const totalPhrases = lessons.reduce((sum, lesson) => sum + lesson.phrases.length, 0);
  const completedPhrasePercent = Math.round((completedPhraseIds.size / totalPhrases) * 100);
  const completedLessonPercent = Math.round((completedLessonIds.size / lessons.length) * 100);
  const regionalExposure = Math.min(
    100,
    20 + completedPhraseIds.size * 4 + favoriteLessonIds.size * 3,
  );
  const conversationConfidence = Math.min(100, 24 + conversationLog.length * 6);

  function selectNav(item: NavigationItem) {
    setActiveNav(item);
    document
      .getElementById(navAnchors[item])
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openLesson(lesson: Lesson) {
    setSelectedLessonId(lesson.id);
    setPhraseIndex(0);
    setFlashcardIndex(0);
    setPracticePromptIndex(0);
    setQuizAnswer(null);
    setIsFlashcardFlipped(false);
    setActiveNav("Learn");
    document.getElementById("learn")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

  function markPhraseKnown() {
    if (!currentPhrase) {
      return;
    }
    setCompletedPhraseIds((current) => new Set(current).add(currentPhrase.id));
    setPhraseIndex((current) => (current + 1) % selectedLesson.phrases.length);
  }

  function completeLesson() {
    selectedLesson.phrases.forEach((phrase) => {
      setCompletedPhraseIds((current) => new Set(current).add(phrase.id));
    });
    setCompletedLessonIds((current) => new Set(current).add(selectedLesson.id));
    setActiveNav("Progress");
    document.getElementById("progress")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectDictionaryEntry(entry: DictionaryEntry) {
    setSelectedEntryId(entry.id);
    setActiveNav("Dictionary");
    document.getElementById("dictionary")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function sendConversationMessage() {
    const trimmed = conversationMessage.trim();
    if (!trimmed) {
      return;
    }
    setConversationLog((current) => [
      ...current,
      { speaker: "You", text: trimmed },
      {
        speaker: "Acento",
        text: "Good. Now try adding context: who you are speaking to, how formal the moment is, and whether Dominican phrasing is appropriate.",
      },
    ]);
    setConversationMessage("");
  }

  return (
    <main className="min-h-screen pb-28">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-paper/85 backdrop-blur dark:border-white/10 dark:bg-night/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button className="flex items-center gap-3 text-left" onClick={() => selectNav("Home")}>
            <div className="grid size-10 place-items-center rounded-lg bg-ink text-paper shadow-calm dark:bg-paper dark:text-ink">
              A
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                Acento
              </div>
              <div className="text-xs text-muted">Spanish as it is spoken</div>
            </div>
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" onClick={() => selectNav("Profile")}>
              Sign in
            </Button>
            <Button onClick={() => openLesson(featured)}>Start free</Button>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-14"
      >
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
              each phrase is appropriate. It is built for real conversations, not memorized cards
              without context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [lessons.length.toString(), "starter lessons"],
              [dictionary.length.toString(), "Dominican terms"],
              [totalPhrases.toString(), "contextual phrases"],
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
        id="learn"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.68fr_0.32fr]"
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

          <div className="grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="rounded-lg border border-border p-5 dark:border-white/10">
              <div className="flex items-center justify-between gap-4">
                <Badge>
                  Phrase {phraseIndex + 1} of {selectedLesson.phrases.length}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    aria-label="Previous phrase"
                    className="h-9 w-9 px-0"
                    variant="ghost"
                    onClick={() =>
                      setPhraseIndex(
                        (current) =>
                          (current - 1 + selectedLesson.phrases.length) %
                          selectedLesson.phrases.length,
                      )
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    aria-label="Next phrase"
                    className="h-9 w-9 px-0"
                    variant="ghost"
                    onClick={() =>
                      setPhraseIndex((current) => (current + 1) % selectedLesson.phrases.length)
                    }
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Standard Spanish
              </div>
              <p className="mt-2 text-2xl">{currentPhrase?.standardSpanish}</p>
              <div className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-sienna">
                Dominican Spanish
              </div>
              <p className="mt-2 text-3xl font-semibold">
                {currentPhrase?.regionalSpanish[0]?.text}
              </p>
              <p className="mt-3 text-lg text-muted dark:text-white/70">{currentPhrase?.english}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>{currentPhrase?.formality}</Badge>
                <Badge>{currentPhrase?.slangLevel} slang</Badge>
                {completedPhraseIds.has(currentPhrase?.id ?? "") ? (
                  <Badge className="border-sea/30 text-sea">
                    <Check className="mr-1 size-3" />
                    mastered
                  </Badge>
                ) : null}
              </div>
              <AudioControls />
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="size-4 text-sienna" />
                  Context
                </div>
                <p className="mt-3 text-sm leading-6 text-muted dark:text-white/70">
                  {currentPhrase?.context}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted dark:text-white/70">
                  {currentPhrase?.culturalNote}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-sea" />
                    Safe with
                  </div>
                  <p className="mt-2 text-sm text-muted dark:text-white/70">
                    {currentPhrase?.safeToUseWith.join(", ")}
                  </p>
                </div>
                <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <XCircle className="size-4 text-sienna" />
                    Avoid with
                  </div>
                  <p className="mt-2 text-sm text-muted dark:text-white/70">
                    {currentPhrase?.avoidWith.join(", ")}
                  </p>
                </div>
              </div>
              <Button onClick={markPhraseKnown}>
                Mark phrase mastered
                <Check className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-border p-4 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <Badge>Flashcard</Badge>
                <Button
                  aria-label="Reset flashcard"
                  className="h-8 w-8 px-0"
                  variant="ghost"
                  onClick={() => setIsFlashcardFlipped(false)}
                >
                  <RotateCcw className="size-4" />
                </Button>
              </div>
              <button
                className="mt-4 min-h-36 w-full rounded-lg bg-paper p-5 text-left transition hover:bg-border/40 dark:bg-white/5 dark:hover:bg-white/10"
                onClick={() => setIsFlashcardFlipped((current) => !current)}
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted">
                  {isFlashcardFlipped ? "Back" : "Front"}
                </div>
                <p className="mt-3 text-xl font-semibold">
                  {isFlashcardFlipped ? currentFlashcard?.back : currentFlashcard?.front}
                </p>
                {!isFlashcardFlipped && currentFlashcard?.hint ? (
                  <p className="mt-3 text-sm text-muted dark:text-white/70">
                    Hint: {currentFlashcard.hint}
                  </p>
                ) : null}
              </button>
              <Button
                className="mt-3 w-full"
                variant="secondary"
                onClick={() => {
                  setFlashcardIndex((current) => (current + 1) % selectedLesson.flashcards.length);
                  setIsFlashcardFlipped(false);
                }}
              >
                Next card
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4 dark:border-white/10">
              <Badge>Quick quiz</Badge>
              <p className="mt-4 font-medium">{selectedLesson.quickQuiz.prompt}</p>
              <div className="mt-4 grid gap-2">
                {selectedLesson.quickQuiz.options.map((option) => (
                  <button
                    className={
                      quizAnswer === option
                        ? "rounded-md border border-sienna bg-sienna/10 px-3 py-2 text-left text-sm"
                        : "rounded-md border border-border px-3 py-2 text-left text-sm transition hover:border-sienna dark:border-white/10"
                    }
                    key={option}
                    onClick={() => setQuizAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {quizAnswer ? (
                <p className="mt-3 text-sm leading-6 text-muted dark:text-white/70">
                  {quizAnswer === selectedLesson.quickQuiz.answer ? "Correct. " : "Not quite. "}
                  {selectedLesson.quickQuiz.explanation}
                </p>
              ) : null}
            </div>

            <div className="rounded-lg border border-border p-4 dark:border-white/10">
              <Badge>Culture note</Badge>
              <p className="mt-4 text-sm leading-6 text-muted dark:text-white/70">
                {selectedLesson.cultureNote}
              </p>
              <Button className="mt-4 w-full" onClick={completeLesson}>
                Complete lesson
              </Button>
            </div>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="size-4 text-sienna" />
              <h2 className="font-semibold">Lesson map</h2>
            </div>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  className={
                    lesson.id === selectedLesson.id
                      ? "w-full rounded-md border border-sienna bg-sienna/10 p-3 text-left"
                      : "w-full rounded-md border border-border p-3 text-left transition hover:border-sienna dark:border-white/10"
                  }
                  key={lesson.id}
                  onClick={() => openLesson(lesson)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{lesson.title}</span>
                    {completedLessonIds.has(lesson.id) ? (
                      <Check className="size-4 text-sea" />
                    ) : null}
                  </div>
                  <div className="mt-1 text-xs text-muted">{lesson.estimatedMinutes} min</div>
                </button>
              ))}
            </div>
          </Card>
        </aside>
      </section>

      <section
        id="practice"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.6fr_0.4fr]"
      >
        <Card className="space-y-5">
          <div className="flex items-center gap-2">
            <Target className="size-5 text-sienna" />
            <h2 className="text-2xl font-semibold tracking-tight">Practice trainer</h2>
          </div>
          <p className="leading-7 text-muted dark:text-white/70">
            Practice is focused on context. Acento asks you to choose what fits the relationship,
            tone, and situation before you use a regional phrase.
          </p>
          <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Current prompt
            </div>
            <p className="mt-3 text-2xl font-semibold">
              {selectedLesson.practicePrompts[practicePromptIndex]}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  setPracticePromptIndex(
                    (current) => (current + 1) % selectedLesson.practicePrompts.length,
                  )
                }
              >
                Next prompt
              </Button>
              <Button variant="secondary" onClick={markPhraseKnown}>
                Mark related phrase mastered
              </Button>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <Badge>Favorites</Badge>
          {favoriteLessons.length ? (
            favoriteLessons.map((lesson) => (
              <button
                className="w-full rounded-md border border-border p-3 text-left transition hover:border-sienna dark:border-white/10"
                key={lesson.id}
                onClick={() => openLesson(lesson)}
              >
                <div className="font-medium">{lesson.title}</div>
                <div className="mt-1 text-sm text-muted">{lesson.description}</div>
              </button>
            ))
          ) : (
            <p className="text-sm leading-6 text-muted dark:text-white/70">
              Save lessons to build a focused review queue.
            </p>
          )}
        </Card>
      </section>

      <section
        id="dictionary"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.55fr_0.45fr]"
      >
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Search className="size-5 text-sienna" />
              <h2 className="text-2xl font-semibold tracking-tight">Dictionary</h2>
            </div>
            <Badge>{filteredDictionary.length} results</Badge>
          </div>
          <Input
            aria-label="Search dictionary"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search qué lo qué, vaina, guagua..."
            value={query}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Filter className="size-4 text-sienna" />
                Formality
              </span>
              <select
                className="h-10 rounded-md border border-border bg-white px-3 text-sm dark:border-white/10 dark:bg-nightSurface"
                value={formalityFilter}
                onChange={(event) =>
                  setFormalityFilter(event.target.value as DictionaryFormalityFilter)
                }
              >
                <option value="all">All</option>
                {["formal", "neutral", "casual", "intimate", "risky"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Languages className="size-4 text-sea" />
                Slang level
              </span>
              <select
                className="h-10 rounded-md border border-border bg-white px-3 text-sm dark:border-white/10 dark:bg-nightSurface"
                value={slangFilter}
                onChange={(event) => setSlangFilter(event.target.value as DictionarySlangFilter)}
              >
                <option value="all">All</option>
                {["none", "light", "medium", "heavy"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-3">
            {filteredDictionary.map((entry) => (
              <button
                className={
                  selectedEntry?.id === entry.id
                    ? "rounded-md border border-sienna bg-sienna/10 p-4 text-left"
                    : "rounded-md border border-border p-4 text-left transition hover:border-sienna dark:border-white/10"
                }
                key={entry.id}
                onClick={() => selectDictionaryEntry(entry)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-lg font-semibold">{entry.term}</div>
                  <div className="flex gap-2">
                    <Badge>{entry.formality}</Badge>
                    <Badge>{entry.slangLevel}</Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted dark:text-white/70">
                  {entry.meaning}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <Badge>Dictionary detail</Badge>
          <div>
            <h2 className="text-3xl font-semibold">{selectedEntry?.term}</h2>
            <p className="mt-2 leading-7 text-muted dark:text-white/70">{selectedEntry?.meaning}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile label="Pronunciation" value={selectedEntry?.pronunciation ?? ""} />
            <InfoTile
              label="Standard Spanish"
              value={selectedEntry?.standardSpanishEquivalent ?? ""}
            />
            <InfoTile label="Common English" value={selectedEntry?.englishEquivalent ?? ""} />
            <InfoTile label="Region" value={selectedEntry?.region ?? ""} />
          </div>
          <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Example
            </div>
            <p className="mt-2 font-semibold">{selectedEntry?.exampleSentence}</p>
            <p className="mt-1 text-sm text-muted dark:text-white/70">
              {selectedEntry?.englishTranslation}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ContextList title="Safe contexts" items={selectedEntry?.safeContexts ?? []} />
            <ContextList title="Risky contexts" items={selectedEntry?.riskyContexts ?? []} />
          </div>
          <p className="text-sm leading-6 text-muted dark:text-white/70">
            {selectedEntry?.culturalNotes}
          </p>
        </Card>
      </section>

      <section
        id="conversations"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.42fr_0.58fr]"
      >
        <Card className="space-y-4">
          <Badge>Conversation mode</Badge>
          <h2 className="text-2xl font-semibold tracking-tight">Roleplay preview</h2>
          <p className="leading-7 text-muted dark:text-white/70">
            This is the future AI tutor shell. It already models characters, context, and safe
            feedback before provider integration is added.
          </p>
          {[
            ["Taxi driver", "Fast, practical, route-focused"],
            ["Restaurant server", "Polite ordering and service warmth"],
            ["Dominican grandmother", "Warm family language, careful respect"],
            ["Barber", "Direct vocabulary, clear preferences"],
          ].map(([name, detail]) => (
            <button
              className="w-full rounded-md border border-border p-3 text-left transition hover:border-sienna dark:border-white/10"
              key={name}
            >
              <div className="font-medium">{name}</div>
              <div className="mt-1 text-sm text-muted">{detail}</div>
            </button>
          ))}
        </Card>

        <Card className="space-y-4">
          <div className="min-h-80 space-y-3 rounded-lg bg-paper p-4 dark:bg-white/5">
            {conversationLog.map((message, index) => (
              <div
                className={
                  message.speaker === "You"
                    ? "ml-auto max-w-[82%] rounded-lg bg-ink p-3 text-paper dark:bg-paper dark:text-ink"
                    : "max-w-[82%] rounded-lg bg-white p-3 dark:bg-nightSurface"
                }
                key={`${message.speaker}-${index}`}
              >
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  {message.speaker}
                </div>
                <p className="mt-1 text-sm leading-6">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              aria-label="Conversation message"
              onChange={(event) => setConversationMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendConversationMessage();
                }
              }}
              placeholder="Try: ¿Cuánto cuesta ir al hotel?"
              value={conversationMessage}
            />
            <Button
              aria-label="Send conversation message"
              className="h-11 w-11 px-0"
              onClick={sendConversationMessage}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </Card>
      </section>

      <section
        id="progress"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.62fr_0.38fr]"
      >
        <Card className="space-y-5">
          <div className="flex items-center gap-2">
            <Globe2 className="size-5 text-sea" />
            <h2 className="text-2xl font-semibold tracking-tight">Progress</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ProgressRing label="Vocabulary mastered" value={completedPhrasePercent} />
            <ProgressRing label="Lessons completed" value={completedLessonPercent} />
            <ProgressRing label="Regional exposure" value={regionalExposure} />
            <ProgressRing label="Conversation confidence" value={conversationConfidence} />
          </div>
        </Card>
        <Card className="space-y-4">
          <Badge>Weekly review</Badge>
          <ProgressRow label="Study goal" value={`${profile.dailyMinutes} min/day`} icon={Clock} />
          <ProgressRow label="Preferred dialect" value={profile.dialect} icon={MapPin} />
          <ProgressRow label="Primary goal" value={profile.goal} icon={Target} />
          <ProgressRow label="Current level" value={profile.level} icon={GraduationCap} />
        </Card>
      </section>

      <section
        id="profile"
        className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.46fr_0.54fr]"
      >
        <Card className="space-y-5">
          <div className="flex items-center gap-2">
            <User className="size-5 text-sienna" />
            <h2 className="text-2xl font-semibold tracking-tight">Onboarding</h2>
          </div>
          <ProfileSelect
            label="Current level"
            options={[...levels]}
            value={profile.level}
            onChange={(value) => setProfile((current) => ({ ...current, level: value }))}
          />
          <ProfileSelect
            label="Reason for learning"
            options={[...goals]}
            value={profile.goal}
            onChange={(value) => setProfile((current) => ({ ...current, goal: value }))}
          />
          <ProfileSelect
            label="Preferred dialect"
            options={[...dialects]}
            value={profile.dialect}
            onChange={(value) => setProfile((current) => ({ ...current, dialect: value }))}
          />
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Daily study goal</span>
            <input
              className="accent-sienna"
              max={30}
              min={5}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  dailyMinutes: Number(event.target.value),
                }))
              }
              step={5}
              type="range"
              value={profile.dailyMinutes}
            />
            <span className="text-muted">{profile.dailyMinutes} minutes per day</span>
          </label>
        </Card>

        <Card className="space-y-5">
          <Badge>Profile summary</Badge>
          <h2 className="text-3xl font-semibold">Guest learner</h2>
          <p className="leading-7 text-muted dark:text-white/70">
            Authentication is ready at the architecture level. The current web app keeps guest
            progress in local state so the learning flow can be evaluated before account
            persistence.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile label="Level" value={profile.level} />
            <InfoTile label="Goal" value={profile.goal} />
            <InfoTile label="Dialect" value={profile.dialect} />
            <InfoTile label="Daily goal" value={`${profile.dailyMinutes} minutes`} />
          </div>
          <Button onClick={() => selectNav("Learn")}>Continue learning</Button>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">All lessons</h2>
            <p className="mt-1 text-sm text-muted">
              Short lessons with standard and regional Spanish.
            </p>
          </div>
          <Button variant="ghost" onClick={() => selectNav("Learn")}>
            View lesson engine
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard
              isFavorite={favoriteLessonIds.has(lesson.id)}
              key={lesson.id}
              lesson={lesson}
              onFavorite={toggleFavorite}
              onStart={openLesson}
            />
          ))}
        </div>
      </section>

      <BottomNavigation active={activeNav} onSelect={selectNav} />
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className="mt-2 font-semibold capitalize">{value}</div>
    </div>
  );
}

function ContextList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
      <div className="font-medium">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted dark:text-white/70">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <Check className="mt-0.5 size-4 shrink-0 text-sea" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfileSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <select
        className="h-10 rounded-md border border-border bg-white px-3 text-sm capitalize dark:border-white/10 dark:bg-nightSurface"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace("_", " ")}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProgressRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-paper p-4 dark:bg-white/5">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-sienna" />
        <span className="text-sm text-muted">{label}</span>
      </div>
      <span className="text-sm font-semibold capitalize">{value}</span>
    </div>
  );
}
