const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/v1";

export type TrainingAttendanceStatus =
  | "present"
  | "absent"
  | "late"
  | "excused";

export type TrainingAttendanceLog = {
  id: string;
  calendarEventId: string;
  memberId: string;
  status: TrainingAttendanceStatus;
  recordedAt: string | null;
  note: string | null;
  createdAt: string | null;
};

type TrainingAttendanceResponse = {
  attendanceLogs?: unknown;
};

function isTrainingAttendanceStatus(
  value: unknown,
): value is TrainingAttendanceStatus {
  return (
    value === "present" ||
    value === "absent" ||
    value === "late" ||
    value === "excused"
  );
}

function normalizeAttendanceLog(value: unknown): TrainingAttendanceLog | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id : null;
  const calendarEventId =
    typeof record.calendarEventId === "string" ? record.calendarEventId : null;
  const memberId = typeof record.memberId === "string" ? record.memberId : null;
  const status = record.status;

  if (!id || !calendarEventId || !memberId || !isTrainingAttendanceStatus(status)) {
    return null;
  }

  const recordedAt =
    typeof record.recordedAt === "string" ? record.recordedAt : null;
  const note = typeof record.note === "string" ? record.note : null;
  const createdAt =
    typeof record.createdAt === "string" ? record.createdAt : null;

  return {
    id,
    calendarEventId,
    memberId,
    status,
    recordedAt,
    note,
    createdAt,
  };
}

export class TrainingAttendanceFetchError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "TrainingAttendanceFetchError";
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type FetchTrainingAttendanceOptions = {
  signal?: AbortSignal;
  authToken: string;
  memberId: string;
};

export async function fetchTrainingAttendance({
  signal,
  authToken,
  memberId,
}: FetchTrainingAttendanceOptions): Promise<TrainingAttendanceLog[]> {
  const response = await fetch(
    `${API_BASE_URL}/training-attendance?memberId=${encodeURIComponent(memberId)}`,
    {
      signal,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new TrainingAttendanceFetchError(
      `Failed to fetch training attendance (${response.status})`,
      response.status,
    );
  }

  const payload = (await response.json()) as TrainingAttendanceResponse;
  const { attendanceLogs } = payload;

  if (!Array.isArray(attendanceLogs)) {
    return [];
  }

  return attendanceLogs
    .map((log) => normalizeAttendanceLog(log))
    .filter((log): log is TrainingAttendanceLog => log !== null);
}
