# Backend Template

A production-ready Express + TypeScript + Prisma starter template.

## Features

- TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- JWT Authentication Utilities
- Global Error Handling
- Environment Validation
- Feature-Based Architecture
- Repository Pattern
- ESLint

## Project Structure

```text
src/
├── configs/
├── features/
├── middlewares/
├── shared/
│   ├── constants/
│   ├── errors/
│   ├── types/
│   └── utils/
├── app.ts
└── server.ts
```

## Installation

```bash
npm install
```

## Environment

Create a `.env` file from `.env.example`.

Required variables:

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
NODE_ENV=development
```

## Prisma

Generate client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

## Development

```bash
npm run dev
```

## Architecture

Every feature follows:

```text
feature/
├── feature.route.ts
├── feature.controller.ts
├── feature.service.ts
└── feature.repository.ts
```

Responsibilities:

- Repository → Database only
- Service → Business logic
- Controller → HTTP handling
- Router → Route registration

## License

MIT
