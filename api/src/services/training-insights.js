const { query } = require("../db/pool");
const { addDays, startOfWeek, toIsoString, toDate } = require("../utils/date");

const ATTENDED_STATUSES = new Set(["present", "late"]);
const SUPPORTIVE_STATUSES = new Set(["excused"]);

function clampWeeks(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 3;
  }

  const integer = Math.floor(value);
  if (integer < 1) {
    return 1;
  }
  if (integer > 12) {
    return 12;
  }
  return integer;
}

function getWeekKey(date) {
  return startOfWeek(date).toISOString().split("T")[0];
}

function deriveSessionNoteKeys(titleKey) {
  if (typeof titleKey !== "string") {
    return { focusKey: null, emphasisKey: null };
  }

  const match = titleKey.match(/^calendar\.events\.([^.]+)\.title$/);
  if (!match) {
    return { focusKey: null, emphasisKey: null };
  }

  const suffix = match[1];
  return {
    focusKey: `information.trainingAttendance.sessions.${suffix}.focus`,
    emphasisKey: `information.trainingAttendance.sessions.${suffix}.emphasis`,
  };
}

function calculateAttendanceRate({ attended, supportive, total }) {
  if (!total || total <= 0) {
    return null;
  }

  const rate = ((attended + supportive) / total) * 100;
  return Math.round(rate * 10) / 10;
}

function determineRosterStatus(lastStatus) {
  if (!lastStatus) {
    return "pending";
  }

  if (ATTENDED_STATUSES.has(lastStatus)) {
    return "confirmed";
  }

  if (SUPPORTIVE_STATUSES.has(lastStatus)) {
    return "medicalHold";
  }

  return "pending";
}

async function getTrainingInsights(options = {}, executor = query) {
  const { weeks: weeksOption, referenceDate: referenceDateOption } = options;
  const weeks = clampWeeks(weeksOption);
  const referenceDate = referenceDateOption ? toDate(referenceDateOption) : new Date();

  if (Number.isNaN(referenceDate.getTime())) {
    throw new TypeError("Invalid reference date");
  }

  const referenceWeekStart = startOfWeek(referenceDate);
  const weekWindows = [];
  for (let index = weeks - 1; index >= 0; index -= 1) {
    const weekStart = addDays(referenceWeekStart, -7 * index);
    const weekEnd = addDays(weekStart, 7);
    weekWindows.push({
      key: getWeekKey(weekStart),
      start: weekStart,
      end: weekEnd,
    });
  }

  const firstWeekStart = weekWindows[0]?.start ?? referenceWeekStart;
  const lastWeekEnd = weekWindows[weekWindows.length - 1]?.end ?? addDays(referenceWeekStart, 7);

  const eventsResult = await executor(
    `SELECT ce.id, ce.title_key, ce.location_key, ce.start_time, ce.end_time, ted.coach_key
       FROM calendar_events ce
       LEFT JOIN training_event_details ted ON ted.calendar_event_id = ce.id
      WHERE ce.category = 'training'
        AND ce.start_time >= $1
        AND ce.start_time < $2
      ORDER BY ce.start_time ASC`,
    [firstWeekStart, lastWeekEnd],
  );

  const events = eventsResult.rows ?? [];

  const eventIds = events.map((event) => event.id);
  const attendanceResult = eventIds.length
    ? await executor(
        `SELECT calendar_event_id, member_id, status, recorded_at, note
           FROM training_attendance_logs
          WHERE calendar_event_id = ANY($1::uuid[])`,
        [eventIds],
      )
    : { rows: [] };

  const attendanceRows = attendanceResult.rows ?? [];

  const weekSummaries = weekWindows.map((window) => ({
    weekKey: window.key,
    rangeStart: window.start,
    rangeEnd: window.end,
    plannedSessions: 0,
    eventIds: [],
    attendance: {
      present: 0,
      late: 0,
      excused: 0,
      absent: 0,
    },
    totalAttendanceLogs: 0,
  }));

  const weekByEventId = new Map();
  for (const week of weekSummaries) {
    for (const event of events) {
      const startTime = new Date(event.start_time);
      if (startTime >= week.rangeStart && startTime < week.rangeEnd) {
        week.plannedSessions += 1;
        week.eventIds.push(event.id);
        weekByEventId.set(event.id, week);
      }
    }
  }

  for (const log of attendanceRows) {
    const week = weekByEventId.get(log.calendar_event_id);
    if (!week) {
      continue;
    }

    week.totalAttendanceLogs += 1;
    if (log.status === "present") {
      week.attendance.present += 1;
    } else if (log.status === "late") {
      week.attendance.late += 1;
    } else if (log.status === "excused") {
      week.attendance.excused += 1;
    } else if (log.status === "absent") {
      week.attendance.absent += 1;
    }
  }

  const weekMetrics = weekSummaries.map((week) => {
    const attended = week.attendance.present + week.attendance.late;
    const supportive = week.attendance.excused;
    const total = week.totalAttendanceLogs;

    return {
      weekKey: week.weekKey,
      rangeStart: toIsoString(week.rangeStart),
      rangeEnd: toIsoString(addDays(week.rangeEnd, -1)),
      plannedSessions: week.plannedSessions,
      attendance: week.attendance,
      totalAttendanceLogs: total,
      attendedLogs: attended,
      supportiveLogs: supportive,
      attendanceRate: calculateAttendanceRate({ attended, supportive, total }),
    };
  });

  const totalPlannedSessions = weekMetrics.reduce(
    (accumulator, week) => accumulator + week.plannedSessions,
    0,
  );
  const totals = weekMetrics.reduce(
    (accumulator, week) => {
      accumulator.attended += week.attendedLogs;
      accumulator.supportive += week.supportiveLogs;
      accumulator.total += week.totalAttendanceLogs;
      return accumulator;
    },
    { attended: 0, supportive: 0, total: 0 },
  );

  const attendanceRate = calculateAttendanceRate(totals);

  const previousWeek = weekMetrics.length > 1 ? weekMetrics[weekMetrics.length - 2] : null;
  const previousAttendanceRate = previousWeek?.attendanceRate ?? null;
  const rateDelta =
    attendanceRate !== null && previousAttendanceRate !== null
      ? Math.round((attendanceRate - previousAttendanceRate) * 10) / 10
      : null;

  const bestWeek = weekMetrics.reduce((best, current) => {
    if (!current.attendanceRate && current.attendanceRate !== 0) {
      return best;
    }

    if (!best) {
      return current;
    }

    if ((current.attendanceRate ?? 0) > (best.attendanceRate ?? 0)) {
      return current;
    }

    return best;
  }, null);

  const focusWeek = weekMetrics.reduce((focus, current) => {
    if (!current.attendanceRate && current.attendanceRate !== 0) {
      return focus;
    }

    if (!focus) {
      return current;
    }

    if ((current.attendanceRate ?? Infinity) < (focus.attendanceRate ?? Infinity)) {
      return current;
    }

    return focus;
  }, null);

  const latestWeek = weekSummaries[weekSummaries.length - 1];
  const latestEventIds = latestWeek?.eventIds ?? [];
  const rosterLogs = attendanceRows.filter((log) => latestEventIds.includes(log.calendar_event_id));

  const logsByMember = new Map();
  for (const log of rosterLogs) {
    if (!logsByMember.has(log.member_id)) {
      logsByMember.set(log.member_id, []);
    }
    logsByMember.get(log.member_id).push(log);
  }

  const memberIds = [...logsByMember.keys()];
  const memberResult = memberIds.length
    ? await executor(
        `SELECT id, full_name, role, squad, membership_id
           FROM members
          WHERE id = ANY($1::uuid[])`,
        [memberIds],
      )
    : { rows: [] };

  const memberById = new Map(memberResult.rows.map((row) => [row.id, row]));

  const rosterEntries = [];
  const statusCounts = { confirmed: 0, pending: 0, medicalHold: 0 };

  for (const [memberId, logs] of logsByMember.entries()) {
    const member = memberById.get(memberId);
    if (!member) {
      continue;
    }

    logs.sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at));
    const totalLogs = logs.length;
    const attendedLogs = logs.filter((log) => ATTENDED_STATUSES.has(log.status)).length;
    const supportiveLogs = logs.filter((log) => SUPPORTIVE_STATUSES.has(log.status)).length;
    const plannedSessions = new Set(logs.map((log) => log.calendar_event_id)).size;
    const status = determineRosterStatus(logs[0]?.status);

    statusCounts[status] += 1;

    rosterEntries.push({
      memberId,
      fullName: member.full_name,
      role: member.role,
      squad: member.squad,
      membershipId: member.membership_id,
      status,
      lastAttendanceStatus: logs[0]?.status ?? null,
      lastRecordedAt: toIsoString(logs[0]?.recorded_at ?? null),
      note: logs[0]?.note ?? null,
      attendanceRate: calculateAttendanceRate({
        attended: attendedLogs,
        supportive: supportiveLogs,
        total: totalLogs,
      }),
      plannedSessions,
      attendedSessions: attendedLogs,
      supportiveSessions: supportiveLogs,
    });
  }

  rosterEntries.sort((a, b) => a.fullName.localeCompare(b.fullName, "en"));

  const sessions = events.map((event) => {
    const { focusKey, emphasisKey } = deriveSessionNoteKeys(event.title_key);
    return {
      id: event.id,
      titleKey: event.title_key,
      locationKey: event.location_key,
      coachKey: event.coach_key ?? null,
      start: toIsoString(event.start_time),
      end: toIsoString(event.end_time),
      focusKey,
      emphasisKey,
    };
  });

  return {
    weeks: weekMetrics,
    summary: {
      totalPlannedSessions,
      totalAttendanceLogs: totals.total,
      totalPositiveLogs: totals.attended + totals.supportive,
      attendanceRate,
      previousAttendanceRate,
      rateDelta,
      bestWeekKey: bestWeek?.weekKey ?? null,
      focusWeekKey: focusWeek?.weekKey ?? null,
    },
    roster: {
      statusCounts,
      members: rosterEntries,
    },
    sessions,
  };
}

module.exports = {
  getTrainingInsights,
};
