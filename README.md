# Acento

Acento teaches people how Spanish is actually spoken.

Not textbook Spanish. Not robotic Spanish. Real Spanish with context, culture, pronunciation, regional usage, and respect for when a phrase is appropriate.

The flagship dialect is Dominican Spanish. The platform is intentionally designed to support Puerto Rican, Cuban, Mexican, Colombian, Venezuelan, Argentine, Chilean, and Spain Spanish as first-class regional tracks.

## Why Acento Exists

Most Spanish products teach learners to pass quizzes. Acento prepares them to have real conversations.

Every lesson teaches:

- Standard Spanish.
- Regional Spanish.
- English meaning.
- Pronunciation.
- Cultural context.
- Safe usage.
- Avoid-with guidance.
- Vocabulary and slang level.
- Audio architecture.

Slang is never treated as a toy. Acento teaches regional speech with context, caution, and respect.

## Product Philosophy

Think Apple, Linear, Raycast, and Notion. Calm. Premium. Spacious. Precise.

No cartoon clutter. No gamification overload. No fake fluency. The interface should feel like a serious tool for people who care about speaking well.

## Screenshots

Add screenshots as the product matures:

- `assets/screenshots/web-home.png`
- `assets/screenshots/lesson-detail.png`
- `assets/screenshots/dictionary.png`
- `assets/screenshots/ios-home.png`
- `assets/screenshots/android-home.png`

## Architecture

```mermaid
flowchart TB
    Web[Next.js Web] --> API[Spring Boot API]
    iOS[SwiftUI iOS] --> API
    Android[Jetpack Compose Android] --> API
    API --> Postgres[(PostgreSQL)]
    API -. future .-> Redis[(Redis)]
    API --> OpenAPI[OpenAPI]

    Web --> Content[@acento/content]
    Web --> UI[@acento/ui]
    Web --> Design[@acento/design-system]
    iOS --> NativeModels[Native mirrored models]
    Android --> NativeModels
```

More detail: [docs/architecture.md](docs/architecture.md)

## Tech Stack

| Area     | Stack                                                                                  |
| -------- | -------------------------------------------------------------------------------------- |
| Web      | Next.js, TypeScript, Tailwind CSS, shadcn-style primitives, Framer Motion              |
| iOS      | SwiftUI, native design patterns, Dark Mode, haptics-ready                              |
| Android  | Jetpack Compose, Material 3                                                            |
| API      | Java 21, Spring Boot, PostgreSQL, Flyway, OpenAPI, JWT-ready security                  |
| Monorepo | npm workspaces                                                                         |
| Quality  | TypeScript strict mode, linting, Prettier, Husky, Conventional Commits, GitHub Actions |

## Folder Structure

```text
acento/
├── apps/
│   ├── web/
│   ├── ios/
│   ├── android/
│   └── api/
├── packages/
│   ├── ui/
│   ├── design-system/
│   ├── shared/
│   ├── content/
│   ├── analytics/
│   └── localization/
├── docs/
├── assets/
├── scripts/
├── .github/
└── README.md
```

## Starter Content

Acento ships with real starter content from day one:

- 10 starter lessons.
- 50+ phrase records.
- 14 Dominican dictionary entries.
- Standard Spanish and Dominican Spanish side by side.
- Cultural notes, safe contexts, risky contexts, examples, flashcards, dialogues, quick quizzes, and street-vs-standard comparisons.

Included Dominican terms:

`qué lo qué`, `klk`, `vaina`, `jevi`, `coro`, `tigre`, `chin`, `guagua`, `concho`, `dime a ve`, `ta to`, `mano`, `loco`, `mi amor`.

Content docs: [docs/content-safety.md](docs/content-safety.md)

## Developer Setup

```sh
npm install
npm run content:check
npm run lint
npm run test
npm run build
```

Run web:

```sh
npm run dev
```

Run API:

```sh
docker compose -f apps/api/docker-compose.yml up -d
mvn -f apps/api/pom.xml spring-boot:run
```

Web: `http://localhost:3000`  
API Swagger: `http://localhost:8080/swagger-ui.html`

## Deployment

- Web: Vercel-ready Next.js app in `apps/web`.
- API: Docker-ready Spring Boot service in `apps/api`.
- Database: PostgreSQL.
- Redis: planned for cache, sessions, rate limiting, and async practice state.
- CI/CD: GitHub Actions.

Deployment notes: [docs/deployment.md](docs/deployment.md)

## Roadmap

### Phase 1

Repository, design system, authentication architecture, navigation, home, lesson engine, dictionary, starter lessons.

### Phase 2

Progress, favorites, offline architecture, audio, phrase trainer.

### Phase 3

AI, speech recognition, conversation coach, native app build targets.

### Phase 4

Teacher dashboard, content CMS, enterprise, analytics.

Full roadmap: [docs/roadmap.md](docs/roadmap.md)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/content-safety.md](docs/content-safety.md) before contributing content.

## License

MIT
