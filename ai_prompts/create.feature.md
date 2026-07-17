# Backend Feature Generation Rules

Generate a complete feature that follows this architecture exactly. Do not skip any layer and do not change the structure.

## Folder Structure

Every feature must be inside:

```text
src/features/<feature-name>/
├── <feature>.route.ts
├── <feature>.controller.ts
├── <feature>.service.ts
├── <feature>.repository.ts
├── <feature>.request.ts
└── <feature>.response.ts
```

---

# Architecture

The request flow must always be:

```
HTTP Request
      ↓
Router
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
Prisma
      ↓
Database
```

Each layer has only one responsibility.

---

# Repository

Repository is responsible only for database operations.

Rules:
-prefer function use class only if necessary

- Use the shared `prisma` instance from `src/configs/prisma.singleton.ts`.
- Never contain business logic.
- Never access `req`, `res`, headers, cookies, JWT, or environment variables.
- Never throw business errors like "User already exists".
- Only perform Prisma queries.
- Return Prisma results.
- Always use Prisma generated types.
- Never create duplicate interfaces for database models.
- Do not use `any`.

Repository methods should be small and reusable.

---

# Service

Service contains all business logic.

Rules:

- Never access Express Request or Response.
- Call repositories only.
- Validate business rules.
- Throw `HttpError(status, message)` for expected failures.
- Return domain results.
- Keep methods small.

Never write Prisma queries inside the service.

---

# Controller

Controller is responsible only for HTTP.

Rules:

- Read data from Request.
- Validate requests using Zod.
- Call the service.
- Return success responses only.
- Never contain business logic.
- Never call Prisma directly.
- Never catch business errors.
- Errors are handled by the global error middleware.
  import type { HttpError } from "../errors/http.error.js";

use this type = type HttpBody<T> =
| {
success: true;
data: T;
}
| { success: false; error: HttpError };

# Response

response contain the data part and the success is true
Use it to infer the response type.

# Request Validation

Every endpoint must have its own Zod request schema.

Validate:

- params
- query
- body
- headers

using

```ts
schema.safeParse(...)
```

If validation fails:

```ts
throw new HttpError(HttpErrorStatus.BAD_REQUEST, "Invalid request");
```

Never trust `req.body`.

---

Never manually duplicate response interfaces.

---

# Router

Router only registers endpoints.

Rules:

- Never contain business logic.
- Never call Prisma.
- Never call repositories.
- Never call services directly.
- Only connect routes to controllers.
- Use the proper HTTP method (`get`, `post`, `patch`, `put`, `delete`).
- Do not use `router.use()` for API endpoints.

Example:

```ts
router.post("/sync", userController.syncUser);
```

---

# Prisma

Use only the generated Prisma types.

Examples:

- UserCreateInput
- UserUpdateInput
- Prisma.UserGetPayload<...>

Prefer Prisma generated types over custom interfaces.

Do not duplicate model types.

---

# Error Handling

Expected errors:

```ts
throw new HttpError(HttpErrorStatus.NOT_FOUND, "User not found");
```

Unexpected errors are handled by the global error middleware.

Do not use try/catch unless converting external library errors into `HttpError`.

---

# Authentication

Authenticated controllers obtain the current user id using:

```ts
const userId = getUserId(req);
```

Never decode JWTs inside controllers or services.

Authentication middleware is responsible for setting:

```ts
req.userId;
```

---

# Coding Style

- Strong typing everywhere.
- No `any`.
- No `Object`.
- Small functions.
- Follow SOLID.
- Prefer composition over duplication.
- Use async/await.
- Await every asynchronous operation.
- Use descriptive names.
- Use singular names (`userService`, `UserRepository`).
- make everything to function instead of class
- use less comment and use only when necessary

---

Generate every required file with complete code.

The generated code should compile without modification and follow the architecture above exactly.
