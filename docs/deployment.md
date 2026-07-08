# Deployment

## Web

The web app is Vercel-ready.

```sh
npm run build --workspace @acento/web
```

Environment:

```text
NEXT_PUBLIC_API_URL=https://api.acento.app
```

## API

The API is Docker-ready.

```sh
docker build -t acento-api apps/api
```

Required environment:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
ACENTO_JWT_ISSUER
ACENTO_JWT_SECRET
```

## Database

PostgreSQL is the system of record. Flyway owns migrations.

## Redis

Redis is planned for:

- Rate limiting.
- Session-adjacent ephemeral state.
- Practice state.
- Conversation mode state.
- Cache for dictionary/search views.

## CI/CD

GitHub Actions runs:

- npm install.
- format check.
- lint.
- TypeScript/package tests.
- Next.js build.
- Maven API tests.
