# Contributing

Acento is designed as a serious language-learning platform, so contributions should be careful, respectful, and production-minded.

## Principles

- Do not invent slang.
- Do not flatten regional speech into stereotypes.
- Always include standard Spanish alongside regional variants.
- Explain context, formality, and safe usage.
- Keep business logic out of UI components.
- Keep reusable UI in packages.
- Prefer accessibility and calm product design over novelty.

## Local Setup

```sh
npm install
npm run build
npm run lint
npm run test
```

Backend:

```sh
docker compose -f apps/api/docker-compose.yml up -d
mvn -f apps/api/pom.xml spring-boot:run
```

## Commit Style

Use Conventional Commits:

```text
feat(content): add airport lesson
fix(web): correct dictionary filter state
docs: expand architecture notes
```
