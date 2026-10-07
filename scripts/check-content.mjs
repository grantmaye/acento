import { lessons, dictionary } from "../packages/content/src/index.ts";

if (lessons.length < 10) {
  throw new Error("Acento requires at least 10 starter lessons.");
}

const lessonIds = new Set();
const phraseIds = new Set();
for (const lesson of lessons) {
  if (lessonIds.has(lesson.id)) throw new Error(`Duplicate lesson ID: ${lesson.id}`);
  lessonIds.add(lesson.id);
  const quiz = lesson.quickQuiz;
  if (
    !quiz.prompt ||
    !quiz.explanation ||
    !quiz.options.includes(quiz.answer) ||
    new Set(quiz.options).size !== quiz.options.length
  ) {
    throw new Error(`${lesson.id} requires an unambiguous quiz and explanation.`);
  }
  for (const phrase of lesson.phrases) {
    if (phraseIds.has(phrase.id)) throw new Error(`Duplicate phrase ID: ${phrase.id}`);
    phraseIds.add(phrase.id);
    if (
      phrase.lessonId !== lesson.id ||
      !phrase.standardSpanish ||
      !phrase.context ||
      !phrase.culturalNote ||
      !phrase.safeToUseWith.length ||
      !phrase.regionalSpanish.some((variant) => variant.dialect === "dominican" && variant.text)
    ) {
      throw new Error(`${phrase.id} is missing its lesson, language, or context contract.`);
    }
  }
  if (lesson.phrases.length < 5) {
    throw new Error(`${lesson.id} must include at least 5 phrases.`);
  }
  if (lesson.flashcards.length < 5) {
    throw new Error(`${lesson.id} must include at least 5 flashcards.`);
  }
}

const requiredTerms = [
  "qué lo qué",
  "klk",
  "vaina",
  "jevi",
  "coro",
  "tigre",
  "chin",
  "guagua",
  "concho",
  "dime a ve",
  "ta to",
  "mano",
  "loco",
  "mi amor",
];

const terms = new Set(dictionary.map((entry) => entry.term));
for (const term of requiredTerms) {
  if (!terms.has(term)) {
    throw new Error(`Missing dictionary term: ${term}`);
  }
}

console.log(
  `Content check passed: ${lessons.length} lessons, ${dictionary.length} dictionary terms.`,
);
