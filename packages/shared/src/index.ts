export type Dialect =
  | "standard"
  | "dominican"
  | "puerto_rican"
  | "cuban"
  | "mexican"
  | "colombian"
  | "venezuelan"
  | "argentine"
  | "chilean"
  | "spain";

export type Formality = "formal" | "neutral" | "casual" | "intimate" | "risky";
export type SlangLevel = "none" | "light" | "medium" | "heavy";
export type SkillLevel = "beginner" | "elementary" | "intermediate" | "advanced";

export type RegionalPhrase = {
  dialect: Dialect;
  text: string;
  pronunciation?: string;
  literalMeaning?: string;
};

export type PhraseExample = {
  speakerA: string;
  speakerB: string;
  english: string;
};

export type Phrase = {
  id: string;
  lessonId: string;
  english: string;
  standardSpanish: string;
  regionalSpanish: RegionalPhrase[];
  formality: Formality;
  slangLevel: SlangLevel;
  context: string;
  culturalNote: string;
  safeToUseWith: string[];
  avoidWith: string[];
  examples: PhraseExample[];
  tags: string[];
  audio: {
    slow?: string;
    native?: string;
    male?: string;
    female?: string;
  };
};

export type Flashcard = {
  front: string;
  back: string;
  hint?: string;
};

export type DialogueLine = {
  speaker: string;
  text: string;
  translation: string;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  level: SkillLevel;
  estimatedMinutes: number;
  category: string;
  dialectFocus: Dialect[];
  cultureNote: string;
  streetVsStandard: {
    standard: string;
    street: string;
    guidance: string;
  };
  phrases: Phrase[];
  flashcards: Flashcard[];
  dialogue: DialogueLine[];
  practicePrompts: string[];
  quickQuiz: QuizQuestion;
  relatedDictionaryTerms: string[];
};

export type DictionaryEntry = {
  id: string;
  term: string;
  meaning: string;
  literalMeaning?: string;
  englishEquivalent: string;
  pronunciation: string;
  formality: Formality;
  slangLevel: SlangLevel;
  region: string;
  usageNotes: string;
  culturalNotes: string;
  commonlyUsedBy: string[];
  safeContexts: string[];
  riskyContexts: string[];
  exampleSentence: string;
  standardSpanishEquivalent: string;
  englishTranslation: string;
  relatedPhrases: string[];
  difficulty: SkillLevel;
  audio: {
    slow?: string;
    native?: string;
  };
};

export type UserGoal =
  "travel" | "dating" | "business" | "school" | "family" | "friends" | "heritage" | "move_abroad";

export type OnboardingProfile = {
  currentLevel: SkillLevel;
  learningGoals: UserGoal[];
  countriesOfInterest: Dialect[];
  preferredDialect: Dialect;
  dailyStudyMinutes: 5 | 10 | 15 | 20 | 30;
  reasonForLearning: string;
};
