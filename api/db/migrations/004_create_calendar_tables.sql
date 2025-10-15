CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('training', 'competition')),
  title_key TEXT NOT NULL,
  location_key TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS training_event_details (
  calendar_event_id UUID PRIMARY KEY REFERENCES calendar_events(id) ON DELETE CASCADE,
  coach_key TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS competition_event_details (
  calendar_event_id UUID PRIMARY KEY REFERENCES calendar_events(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('regional', 'national', 'international')),
  check_in TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time
  ON calendar_events (start_time);
