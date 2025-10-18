# API Service

The Cloub API is an Express application that exposes training management resources (members, events, and operational logs) under the `/v1` namespace. The service connects to a PostgreSQL database, applies migrations automatically through the provided script, and protects privileged endpoints with bearer session tokens.

## Prerequisites

- **Node.js 18+** – required to run the service scripts.
- **PostgreSQL 13+** – used for persistence; a local instance is sufficient for development.
- **npm** – bundled with Node.js and used to install dependencies.

## Installation

```bash
npm install
```

This command downloads the dependencies declared in `package.json` and prepares the `node_modules/` directory.

## Configuration

The service reads configuration from environment variables (optionally via a local `.env` file). The defaults support local development, but production deployments should supply explicit values.

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port that the HTTP server listens on. | `4000` |
| `DATABASE_URL` | PostgreSQL connection string, including username, password, host, and database. | `postgres://postgres:postgres@localhost:5432/cloub_sm` |
| `PGSSLMODE` | Set to `require` to enable SSL with `rejectUnauthorized: false`. Leave unset for local development. | _unset_ |
| `JWT_SECRET` | Secret used to sign authentication tokens. | _required for protected routes_ |

Create a `.env` file in the project root (`api/.env`) when running locally:

```env
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/cloub_sm
JWT_SECRET=replace-with-a-secure-secret
```

## Database migrations

Schema changes live in `db/migrations/*.sql`. Run them in order with:

```bash
npm run migrate
```

The migration script keeps track of applied files using the `schema_migrations` table, so you can run the command repeatedly without re-applying existing migrations.

## Running the service

Start the HTTP server after configuring your environment:

```bash
npm start
```

The server binds to the configured `PORT` (default `4000`) and exposes a `/health` probe plus all versioned endpoints beneath `/v1`.

To run the API during development with automatic restarts you can combine the command above with a tool such as `nodemon` (not bundled in this repository).

## Authentication

Authentication uses bearer tokens obtained from the member login endpoint. Include the token in the `Authorization: Bearer <token>` header when calling protected endpoints. Unauthenticated requests receive `401` responses.

## Endpoint overview

### Health & discovery

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/health` | No | Lightweight readiness check returning API status and timestamp. |
| GET | `/v1` | No | Lists top-level resource routes and descriptions. |

### Members (`/v1/members`)

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/` | Yes | List members with optional search, squad, and role filters. Supports `limit` (1-100) and `offset` pagination. |
| POST | `/` | No | Create a member. Requires `fullName`, `email`, `password` (≥ 8 characters), and `membershipId`. |
| POST | `/login` | No | Authenticate a member by email and password, returning profile details, bearer token, and session metadata. |
| GET | `/:id` | Yes | Retrieve the authenticated member by UUID. |
| PUT | `/:id` | Yes | Update the authenticated member. Fields include name, email, password, role, squad, emergency contact, membership ID, and `profilePhotoUrl`. |
| DELETE | `/:id` | Yes | Delete the authenticated member profile. |

**Query parameters**

- `search`: Case-insensitive search applied to full name, email, and membership ID.
- `squad`: Filter by squad (case-insensitive equality).
- `role`: Filter by role (case-insensitive equality).
- `limit`: Integer between 1 and 100. Defaults to unlimited unless provided.
- `offset`: Non-negative integer. Requires `limit` for pagination defaults.

### Calendar events (`/v1/calendar-events`)

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List all calendar events with embedded member rosters and event metadata. |
| GET | `/:id` | No | Retrieve a single event by UUID. |
| POST | `/` | No | Create a calendar event. `category` must be `training` or `competition`; `eventType` must be one of `competition`, `entrainment`, `meet`, or `other`. |
| PUT | `/:id` | No | Update an existing event. Supports all fields accepted on create, with validation for date ranges and membership assignments. |
| DELETE | `/:id` | No | Delete an event by UUID. |

**Payload rules**

Shared fields:

- `category`: `training` or `competition`.
- `eventType`: `competition`, `entrainment`, `meet`, or `other`.
- `titleKey`: i18n key for the event title.
- `locationKey`: i18n key for the location.
- `start` / `end`: ISO 8601 timestamps where end must follow start.
- `members`: Optional array of member UUIDs assigned to the event.

Additional rules:

- Training events require `coachKey` (non-empty string).
- Competition events require `level` (`regional`, `national`, `international`) and `checkIn` (ISO 8601 timestamp).

### Access logs (`/v1/access-logs`)

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List access logs ordered by access time. Supports `memberId` filters and `limit` (default 100, max 500). |
| POST | `/` | No | Record an access event for a member, optionally specifying timestamp, access point, and note. |

**Parameters**

- `memberId` (query or body): Member UUID.
- `accessedAt`: ISO 8601 timestamp; defaults to `NOW()` when omitted.
- `accessPoint`: Optional string describing the entry point.
- `note`: Optional freeform text.

### Training attendance (`/v1/training-attendance`)

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List attendance logs ordered by recorded time. Filters include `memberId`, `calendarEventId`, `status`, and `limit` (default 100, max 500). |
| POST | `/` | No | Record attendance for a member at a calendar event. Requires `calendarEventId`, `memberId`, and `status` (`present`, `absent`, `late`, or `excused`). Optional `recordedAt` and `note`. |

### Training insights (`/v1/training-insights`)

| Method | Path | Protected | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Calculate aggregated training insights. Accepts optional `weeks` (integer 1-12, default 3) and `referenceDate` (ISO 8601) query parameters. |

Responses provide attendance metrics for the requested window, including weekly breakdowns and aggregate attendance rates.

## Testing the API

This project does not ship with automated tests. Use tools such as `curl`, `HTTPie`, or Postman to exercise endpoints manually. For example:

```bash
curl http://localhost:4000/health
```

When targeting protected endpoints, include the bearer token header:

```bash
curl \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/v1/members
```

## Troubleshooting

- Ensure the PostgreSQL service is running and reachable using the credentials supplied in `DATABASE_URL`.
- Verify `JWT_SECRET` is set before invoking protected endpoints; otherwise authentication will fail.
- Check the server logs (stdout) for stack traces when requests fail unexpectedly.
