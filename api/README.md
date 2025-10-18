# API Service

This Express service provides the Cloub training management API. All feature endpoints are mounted under the `/v1` base path, while `/health` offers a lightweight readiness probe. The server expects a PostgreSQL database (configurable through `DATABASE_URL`) and uses bearer session tokens for protected routes.

## Environment

- `PORT` (optional): Port used by the HTTP server. Defaults to `4000`.
- `DATABASE_URL` (optional): PostgreSQL connection string. Defaults to `postgres://postgres:postgres@localhost:5432/cloub_sm`.
- `PGSSLMODE` (optional): When set to `require`, SSL is enabled with `rejectUnauthorized: false`.

## Health & Discovery

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Readiness check returning API status and current timestamp.
| GET | `/v1` | Lists top-level resource routes and descriptions.

## Authentication

Authentication uses bearer tokens returned by the member login endpoint. Include the token in the `Authorization: Bearer <token>` header. Protected endpoints are marked below.

## Members

All endpoints below are prefixed with `/v1/members`.

| Method | Path | Protected | Description |
| ------ | ---- | --------- | ----------- |
| GET | `/` | Yes | List members with optional search, squad, and role filters. Supports `limit` (1-100) and `offset` pagination.
| POST | `/` | No | Create a member. Requires `fullName`, `email`, `password` (≥ 8 chars), and `membershipId`.
| POST | `/login` | No | Authenticate a member by email and password, returning profile details, a bearer token, and session metadata.
| GET | `/:id` | Yes | Retrieve the authenticated member by UUID.
| PUT | `/:id` | Yes | Update the authenticated member. Supports name, email, password, role, squad, emergencyContact, membershipId, and profilePhotoUrl.
| DELETE | `/:id` | Yes | Delete the authenticated member profile.

### Member Query Parameters

- `search`: Case-insensitive search applied to full name, email, and membership ID.
- `squad`: Filter by squad (case-insensitive equality).
- `role`: Filter by role (case-insensitive equality).
- `limit`: Integer between 1 and 100. Defaults to unlimited unless provided.
- `offset`: Non-negative integer. Requires `limit` for pagination defaults.

## Calendar Events

All endpoints below are prefixed with `/v1/calendar-events`.

| Method | Path | Protected | Description |
| ------ | ---- | --------- | ----------- |
| GET | `/` | No | List all calendar events with embedded member rosters and event-specific metadata.
| GET | `/:id` | No | Retrieve a single event by UUID.
| POST | `/` | No | Create a calendar event. Valid `category` values are `training` or `competition`; `eventType` must be one of `competition`, `entrainment`, `meet`, or `other`.
| PUT | `/:id` | No | Update an existing event. Supports all fields accepted on create, with validation for date ranges and membership assignments.
| DELETE | `/:id` | No | Delete an event by UUID.

### Calendar Event Payloads

Shared fields:
- `category`: `training` or `competition`.
- `eventType`: `competition`, `entrainment`, `meet`, or `other`.
- `titleKey`: i18n key for the event title.
- `locationKey`: i18n key for the location.
- `start` / `end`: ISO 8601 timestamps where end must be after start.
- `members`: Optional array of member UUIDs assigned to the event.

Additional rules:
- Training events require `coachKey` (non-empty string).
- Competition events require `level` (`regional`, `national`, `international`) and `checkIn` (ISO 8601 timestamp).

## Access Logs

All endpoints below are prefixed with `/v1/access-logs`.

| Method | Path | Protected | Description |
| ------ | ---- | --------- | ----------- |
| GET | `/` | No | List access logs ordered by access time. Supports optional `memberId` filter and `limit` (default 100, max 500).
| POST | `/` | No | Record an access event for a member, optionally specifying timestamp, access point, and note.

### Access Log Parameters

- `memberId` (query or body): Must be a valid member UUID.
- `accessedAt`: ISO 8601 timestamp; defaults to `NOW()` when omitted.
- `accessPoint`: Optional string describing the entry point.
- `note`: Optional string note.

## Training Attendance

All endpoints below are prefixed with `/v1/training-attendance`.

| Method | Path | Protected | Description |
| ------ | ---- | --------- | ----------- |
| GET | `/` | No | List attendance logs ordered by recorded time. Filters include `memberId`, `calendarEventId`, `status`, and `limit` (default 100, max 500).
| POST | `/` | No | Record attendance for a member at a calendar event. Requires `calendarEventId`, `memberId`, and `status` (`present`, `absent`, `late`, or `excused`). Optional `recordedAt` and `note` fields.

## Training Insights

All endpoints below are prefixed with `/v1/training-insights`.

| Method | Path | Protected | Description |
| ------ | ---- | --------- | ----------- |
| GET | `/` | No | Calculate aggregated training insights. Accepts optional `weeks` (integer 1-12, default 3) and `referenceDate` (ISO 8601) query parameters.

The response summarises attendance metrics for the requested window, including weekly breakdowns and aggregate attendance rates.
