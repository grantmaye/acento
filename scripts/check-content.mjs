import { lessons, dictionary } from "../packages/content/src/index.ts";

if (lessons.length < 10) {
  throw new Error("Acento requires at least 10 starter lessons.");
}

for (const lesson of lessons) {
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
