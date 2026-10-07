# Build and deployment boundaries

The repository provides buildable web code and an API Dockerfile. The GitHub workflow runs verification only; it does not publish, deploy, provision accounts, or configure a production database. No live deployment or production readiness is claimed.

## Web

Build from the monorepo root so npm workspaces resolve:

```sh
npm ci
npm run build
npm run start --workspace @acento/web -- --port 3000
```

The web page imports authored content and keeps learning state in memory. It does not currently use `NEXT_PUBLIC_API_URL`, so configuring that variable will not connect learner state to the API. The Next.js workspace is `apps/web`; any host configuration must preserve access to the shared packages.

## API

The API Docker build uses Java 21 and Maven:

```sh
docker build -t acento-api apps/api
```

Supply `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` through the process environment. `SERVER_PORT` defaults to 8080. The local Compose setup exposes PostgreSQL at host port 5433; containers connecting to the Compose service would use its internal port 5432. `application.yml` defaults are for disposable local development.

Flyway owns the API's schema. The database tables are a foundation and are not the current web session's system of record. The JWT issuer/secret configuration does not activate authentication: security is permissive and the token service only returns a preview. Do not expose personal learner data through this scaffold without implementing and testing identity and authorization first.

## Unimplemented operating requirements

Real hosting needs a deliberate identity model, durable learner-state APIs, environment/secret management, backups and recovery, retention/privacy choices, monitoring, content review operations, and appropriate request controls. Redis is listed in Compose for future work but has no current application integration. Native builds and distribution are also future work.

See [technical manual](technical-manual.md) for reproducible setup/tests and [dependency notes](dependency-notes.md) for current audit limits. This document is a readiness boundary, not authorization to deploy.
