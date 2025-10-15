CREATE TABLE IF NOT EXISTS member_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  access_point TEXT,
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_member_access_logs_member_id
  ON member_access_logs (member_id, accessed_at DESC);

CREATE TABLE IF NOT EXISTS training_attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_event_id UUID NOT NULL REFERENCES calendar_events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (calendar_event_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_training_attendance_logs_member
  ON training_attendance_logs (member_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_training_attendance_logs_event
  ON training_attendance_logs (calendar_event_id, recorded_at DESC);
