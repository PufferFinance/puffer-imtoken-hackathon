# Puffer Backend Service Template

- [Development](#development)
- [Swagger](#swagger)
- [Deployment](#deployment)
- [Tools](#tools)
- [Directory Structure](#directory-structure)
- [Docker](#docker)

## Development

Install dependencies.

```sh
pnpm install
```

Copy `.env.example` to `.env` and set the required environment variables.

```sh
cp .env.example .env
```

Start the package in watch mode.

```sh
pnpm dev
```

## Swagger

Access Swagger by navigating to `/docs` on the local server. If the `BASE_URL` is set to `/puffer-backend-service`, the full URL will be <http://localhost:8080/puffer-backend-service/docs>.

## Deployment

Deployment is done through the [`deploy.yml`](./.github/workflows/deploy.yml) GitHub action workflow. Navigate to the [deploy workflow](../../actions/workflows/deploy.yml) to trigger it.

## Tools

- **Package manager:** pnpm
- **Library:** Express.js
- **Build:** ESBuild and TypeScript Execute (TSX)
- **Unit Testing:** Jest
- **API Testing:** Supertest
- **Linting:** ESLint and Prettier
- **Logging:** Pino
- **Monitoring:** Sentry
- **Deployment:** AWS ECS
- **Pipeline:** GitHub Actions
- **API Documentation:** Swagger UI

## Directory Structure

```text
.
├── src/
│   ├── common/                                  — Common utility functions, types and models
│   ├── middleware/                              — Custom middlewares
│   ├── api/                                     — Root directory for API-related files
│   │   ├── <module>/                            — Directory for a module containing endpoints
│   │   │   ├── __tests__/                       — Tests specific to this module
│   │   │   ├── lib/                             — Module-specific libraries or helpers
│   │   │   │   ├── types.ts
│   │   │   │   └── utils.ts
│   │   │   ├── controllers/                     — Controllers for handling API requests
│   │   │   │   ├── __tests__/
│   │   │   │   ├── lib/
│   │   │   │   └── sample-controller.ts
│   │   │   ├── services/                        — Services for business logic
│   │   │   │   ├── __tests__/
│   │   │   │   ├── lib/
│   │   │   │   └── sample-service.ts
│   │   │   └── repositories/                    — Repository for fetching data from a datasource
│   │   │       ├── __tests__/
│   │   │       ├── lib/
│   │   │       └── sample-repository.ts
│   │   └── index.ts                             — Exports of the module
│   ├── index.ts                                 — Entry point for the application
│   └── server.ts                                — Express app setup for a server
└── test/                                        — Test utilities
```

## Docker

The service is dockerized and deployed to AWS ECS. See [`Dockerfile`](./Dockerfile) for more details.

When dockerizing locally, make sure the `.env` file is correctly setup using [`.env.example`](./.env.example) as reference.

If using docker compose, simply run the following command.

```sh
docker compose up
```

Or to build and run the image manually.

```sh
docker build -t puffer-backend-service .
docker run -p 8080:8080 --env-file .env puffer-backend-service
```
