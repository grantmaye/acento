# Architecture

Acento is a multi-platform monorepo with a shared content and design foundation.

## Monorepo Boundaries

```mermaid
flowchart LR
    Content[packages/content] --> Web[apps/web]
    Shared[packages/shared] --> Content
    Shared --> Web
    UI[packages/ui] --> Web
    Design[packages/design-system] --> UI
    Analytics[packages/analytics] --> Web
    Localization[packages/localization] --> Web
    API[apps/api] --> DB[(PostgreSQL)]
```

## Runtime Architecture

```mermaid
flowchart TB
    User[User] --> Web[Next.js Web]
    User --> IOS[SwiftUI iOS]
    User --> Android[Jetpack Compose Android]
    Web --> API[Spring Boot API]
    IOS --> API
    Android --> API
    API --> Postgres[(PostgreSQL)]
    API -. future .-> Redis[(Redis)]
    API --> Auth[JWT Auth]
    API --> OpenAPI[OpenAPI Docs]
```

## Core Product Domains

- Identity: email/password, Google, Apple, anonymous guest mode.
- Onboarding: level, goals, countries, preferred dialect, daily goal, reason for learning.
- Lessons: standard vs regional phrases, explanations, culture, audio, usage tips.
- Dictionary: searchable terms with pronunciation, usage, slang level, related phrases.
- Practice: phrase trainer, flashcards, pronunciation placeholders.
- Conversations: future roleplay characters and AI coach ports.
- Progress: learning hours, vocabulary, listening, pronunciation, grammar, regional exposure.
- Admin: content management, phrase approval, dialect management, audio uploads, analytics.

## AI Extension Points

The API includes an `AiCoachPort` interface and deferred implementation. Future AI features should plug into this boundary:

- Conversation tutor.
- Roleplay.
- Pronunciation coach.
- Grammar coach.
- Vocabulary recommendations.
- Speech feedback.

No AI behavior is implemented yet.

## Content Model

Every phrase supports multiple regional variants:

```ts
type Phrase = {
  standardSpanish: string;
  regionalSpanish: {
    dialect: Dialect;
    text: string;
    pronunciation?: string;
    literalMeaning?: string;
  }[];
  formality: Formality;
  slangLevel: SlangLevel;
  context: string;
  culturalNote: string;
  safeToUseWith: string[];
  avoidWith: string[];
};
```

This prevents hardcoded Dominican-only logic while still making Dominican Spanish the flagship track.
