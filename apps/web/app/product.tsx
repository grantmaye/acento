"use client";

import type { DictionaryEntry, Lesson, Phrase } from "@acento/shared";
import {
  AudioControls,
  Badge,
  BottomNavigation,
  Button,
  Card,
  Input,
  type NavigationItem,
} from "@acento/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, ChevronRight, Heart, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const navAnchors: Record<NavigationItem, string> = {
  Today: "today",
  Practice: "practice",
  Saved: "saved",
  Dictionary: "dictionary",
  Profile: "profile",
};

type SavedPhrase = {
  lessonTitle: string;
  phrase: Phrase;
};

export function AcentoDashboard({
  lessons,
  dictionary,
}: {
  lessons: Lesson[];
  dictionary: DictionaryEntry[];
}) {
  const lesson = lessons.find((item) => item.id === "greetings") ?? lessons[0];
  const [activeNav, setActiveNav] = useState<NavigationItem>("Today");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [savedPhraseIds, setSavedPhraseIds] = useState<Set<string>>(new Set());
  const [completedPhraseIds, setCompletedPhraseIds] = useState<Set<string>>(new Set());
  const [dictionaryQuery, setDictionaryQuery] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState("que-lo-que");
  const [dailyGoal, setDailyGoal] = useState(5);

  const phrase = lesson.phrases[phraseIndex] ?? lesson.phrases[0];
  const regional = phrase?.regionalSpanish[0];
  const isSaved = savedPhraseIds.has(phrase?.id ?? "");
  const isComplete = completedPhraseIds.has(phrase?.id ?? "");
  const progress = Math.round((completedPhraseIds.size / lesson.phrases.length) * 100);

  const savedPhrases: SavedPhrase[] = lesson.phrases
    .filter((item) => savedPhraseIds.has(item.id))
    .map((item) => ({ lessonTitle: lesson.title, phrase: item }));

  const selectedEntry =
    dictionary.find((entry) => entry.id === selectedEntryId) ??
    dictionary.find((entry) => entry.term.toLowerCase().includes("qué lo qué")) ??
    dictionary[0];

  const filteredDictionary = useMemo(() => {
    const query = dictionaryQuery.trim().toLowerCase();
    const entries = query
      ? dictionary.filter((entry) =>
          [entry.term, entry.meaning, entry.englishEquivalent, entry.standardSpanishEquivalent]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : dictionary.slice(0, 6);

    return entries.slice(0, 8);
  }, [dictionary, dictionaryQuery]);

  function selectNav(item: NavigationItem) {
    setActiveNav(item);
    document
      .getElementById(navAnchors[item])
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSaved() {
    if (!phrase) {
      return;
    }
    setSavedPhraseIds((current) => {
      const next = new Set(current);
      if (next.has(phrase.id)) {
        next.delete(phrase.id);
      } else {
        next.add(phrase.id);
      }
      return next;
    });
  }

  function moveOn() {
    if (phrase) {
      setCompletedPhraseIds((current) => new Set(current).add(phrase.id));
    }
    setPracticeAnswer(null);
    setShowWhy(false);
    setHasListened(false);
    setPhraseIndex((current) => (current + 1) % lesson.phrases.length);
    selectNav("Today");
  }

  return (
    <main className="min-h-screen pb-28">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5">
        <button className="flex items-center gap-3 text-left" onClick={() => selectNav("Today")}>
          <div className="grid size-10 place-items-center rounded-lg bg-ink text-paper dark:bg-paper dark:text-ink">
            A
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Acento
            </div>
            <div className="text-xs text-muted">One phrase. Real context.</div>
          </div>
        </button>
        <div className="text-right text-xs text-muted">
          <div>{progress}% today</div>
          <div>{completedPhraseIds.size} phrases understood</div>
        </div>
      </header>

      <section id="today" className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-8 max-w-2xl">
          <Badge className="bg-white/60 dark:bg-white/5">
            <Sparkles className="mr-2 size-3" />
            Today’s phrase
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Learn this well. Then move on.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted dark:text-white/70">
            Acento keeps the session small: hear the phrase, understand the situation, try one
            prompt, and save it if it matters to you.
          </p>
        </div>

        <Card className="space-y-7 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge>
                {lesson.title} · {phraseIndex + 1} of {lesson.phrases.length}
              </Badge>
              <p className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
                {regional?.text}
              </p>
              <p className="mt-4 text-xl text-muted dark:text-white/70">{phrase?.english}</p>
            </div>
            <button
              aria-label={isSaved ? "Remove saved phrase" : "Save phrase"}
              className="rounded-md p-2 text-muted transition hover:bg-ink/5 hover:text-sienna dark:hover:bg-white/10"
              onClick={toggleSaved}
            >
              <Heart className={isSaved ? "size-6 fill-sienna text-sienna" : "size-6"} />
            </button>
          </div>

          <AudioControls onPlay={() => setHasListened(true)} />

          <AnimatePresence>
            {hasListened ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-3 md:grid-cols-2"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
              >
                <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Standard Spanish
                  </div>
                  <p className="mt-2 text-2xl">{phrase?.standardSpanish}</p>
                </div>
                <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-sienna">
                    Dominican Spanish
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{regional?.text}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="rounded-lg border border-border p-5 dark:border-white/10">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="size-4 text-sienna" />
              Why it matters
            </div>
            <p className="mt-3 text-base leading-7 text-muted dark:text-white/70">
              {phrase?.context}
            </p>
          </div>

          {showWhy ? (
            <div className="grid gap-3 md:grid-cols-2">
              <DetailBlock title="Safe with" body={phrase?.safeToUseWith.join(", ") ?? ""} />
              <DetailBlock title="Avoid with" body={phrase?.avoidWith.join(", ") ?? ""} />
              <DetailBlock
                title="Formality"
                body={`${phrase?.formality} · ${phrase?.slangLevel} slang`}
              />
              <DetailBlock title="Culture note" body={phrase?.culturalNote ?? ""} />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setShowWhy((current) => !current)}>
              {showWhy ? "Hide details" : "Learn why"}
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => selectNav("Practice")}>
                Practice
              </Button>
              <Button onClick={moveOn}>
                {isComplete ? "Next phrase" : "I understand"}
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section id="practice" className="mx-auto max-w-3xl px-5 py-10">
        <Card className="space-y-6 p-6 md:p-8">
          <div>
            <Badge>Practice</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Try it once.</h2>
            <p className="mt-3 leading-7 text-muted dark:text-white/70">
              No score pressure. Just check whether you understand when the phrase fits.
            </p>
          </div>

          <div className="rounded-lg bg-paper p-5 dark:bg-white/5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Prompt</div>
            <p className="mt-3 text-xl font-semibold">
              You are greeting a close friend by text. Which version fits best?
            </p>
          </div>

          <div className="grid gap-3">
            {[
              regional?.text ?? "",
              phrase?.standardSpanish ?? "",
              "Muy buenos días, estimado señor.",
            ].map((answer, index) => (
              <button
                className={
                  practiceAnswer === answer
                    ? "rounded-lg border border-sienna bg-sienna/10 p-4 text-left"
                    : "rounded-lg border border-border p-4 text-left transition hover:border-sienna dark:border-white/10"
                }
                key={`${answer}-${index}`}
                onClick={() => setPracticeAnswer(answer)}
              >
                {answer}
              </button>
            ))}
          </div>

          {practiceAnswer ? (
            <div className="rounded-lg bg-ink p-5 text-paper dark:bg-paper dark:text-ink">
              <div className="flex items-center gap-2 font-medium">
                <Check className="size-4" />
                {practiceAnswer === regional?.text ? "Good fit." : "Close, but context matters."}
              </div>
              <p className="mt-2 text-sm leading-6 opacity-80">
                {practiceAnswer === regional?.text
                  ? "This is casual and works with friends. Avoid it in formal settings."
                  : "The standard version is useful, but this moment is casual. Acento teaches both so you can choose safely."}
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="secondary" onClick={toggleSaved}>
              <Bookmark className="size-4" />
              {isSaved ? "Saved" : "Save phrase"}
            </Button>
            <Button onClick={moveOn}>Move on</Button>
          </div>
        </Card>
      </section>

      <section id="saved" className="mx-auto max-w-3xl px-5 py-10">
        <Card className="space-y-5 p-6 md:p-8">
          <div>
            <Badge>Saved</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Phrases worth keeping.</h2>
          </div>

          {savedPhrases.length ? (
            <div className="space-y-3">
              {savedPhrases.map((item) => (
                <div
                  className="rounded-lg border border-border p-4 dark:border-white/10"
                  key={item.phrase.id}
                >
                  <div className="text-sm text-muted">{item.lessonTitle}</div>
                  <div className="mt-2 text-2xl font-semibold">
                    {item.phrase.regionalSpanish[0]?.text}
                  </div>
                  <div className="mt-1 text-muted">{item.phrase.english}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="leading-7 text-muted dark:text-white/70">
              Save only the phrases you can imagine using. A short list is better than a noisy one.
            </p>
          )}
        </Card>
      </section>

      <section
        id="dictionary"
        className="mx-auto grid max-w-4xl gap-6 px-5 py-10 md:grid-cols-[0.42fr_0.58fr]"
      >
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-sienna" />
            <h2 className="text-xl font-semibold">Dictionary</h2>
          </div>
          <Input
            aria-label="Search dictionary"
            onChange={(event) => setDictionaryQuery(event.target.value)}
            placeholder="Search vaina, guagua..."
            value={dictionaryQuery}
          />
          <div className="space-y-2">
            {filteredDictionary.map((entry) => (
              <button
                className={
                  selectedEntry?.id === entry.id
                    ? "w-full rounded-md border border-sienna bg-sienna/10 p-3 text-left"
                    : "w-full rounded-md border border-border p-3 text-left transition hover:border-sienna dark:border-white/10"
                }
                key={entry.id}
                onClick={() => setSelectedEntryId(entry.id)}
              >
                <div className="font-medium">{entry.term}</div>
                <div className="mt-1 text-sm text-muted">{entry.englishEquivalent}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <Badge>{selectedEntry?.formality}</Badge>
          <div>
            <h2 className="text-3xl font-semibold">{selectedEntry?.term}</h2>
            <p className="mt-2 leading-7 text-muted dark:text-white/70">{selectedEntry?.meaning}</p>
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
          <DetailBlock title="Use carefully" body={selectedEntry?.usageNotes ?? ""} />
        </Card>
      </section>

      <section id="profile" className="mx-auto max-w-3xl px-5 py-10">
        <Card className="space-y-5 p-6 md:p-8">
          <Badge>Profile</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Keep it light.</h2>
          <p className="leading-7 text-muted dark:text-white/70">
            Learning should feel possible. Start with {dailyGoal} minutes, one phrase, and one
            practice prompt.
          </p>
          <label className="grid gap-3 text-sm">
            <span className="font-medium">Daily goal: {dailyGoal} minutes</span>
            <input
              className="accent-sienna"
              max={15}
              min={5}
              onChange={(event) => setDailyGoal(Number(event.target.value))}
              step={5}
              type="range"
              value={dailyGoal}
            />
          </label>
        </Card>
      </section>

      <BottomNavigation active={activeNav} onSelect={selectNav} />
    </main>
  );
}

function DetailBlock({ body, title }: { body: string; title: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 dark:bg-white/5">
      <div className="text-sm font-medium">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted dark:text-white/70">{body}</p>
    </div>
  );
}
