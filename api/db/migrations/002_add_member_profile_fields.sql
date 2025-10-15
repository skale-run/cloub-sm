ALTER TABLE members
  ADD COLUMN role TEXT,
  ADD COLUMN squad_tier TEXT,
  ADD COLUMN emergency_contact TEXT,
  ADD COLUMN membership_id TEXT UNIQUE,
  ADD COLUMN profile_photo_url TEXT;
