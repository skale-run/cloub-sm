ALTER TABLE calendar_events
  ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL DEFAULT 'other',
  ADD CONSTRAINT calendar_events_event_type_check
    CHECK (event_type IN ('competition', 'entrainment', 'meet', 'other'));

UPDATE calendar_events
SET event_type = CASE
  WHEN category = 'training' THEN 'entrainment'
  WHEN category = 'competition' THEN 'competition'
  ELSE 'other'
END;

CREATE TABLE IF NOT EXISTS calendar_event_members (
  calendar_event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (calendar_event_id, member_id)
);
