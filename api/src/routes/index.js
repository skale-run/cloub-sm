const membersRouter = require("./members");
const calendarEventsRouter = require("./calendar-events");
const accessLogsRouter = require("./access-logs");
const trainingAttendanceRouter = require("./training-attendance");
const trainingInsightsRouter = require("./training-insights");

const ROUTE_DEFINITIONS = Object.freeze(
  [
    {
      path: "/members",
      router: membersRouter,
      description: "Member CRUD, authentication, and session management.",
    },
    {
      path: "/calendar-events",
      router: calendarEventsRouter,
      description: "Manage calendar events and scheduling metadata.",
    },
    {
      path: "/access-logs",
      router: accessLogsRouter,
      description: "Query facility access logs with filtering support.",
    },
    {
      path: "/training-attendance",
      router: trainingAttendanceRouter,
      description: "Record and list training attendance logs.",
    },
    {
      path: "/training-insights",
      router: trainingInsightsRouter,
      description: "Aggregated training insights and roster summaries.",
    },
  ].map(Object.freeze),
);

function listRouterMethods(router) {
  if (!router || !Array.isArray(router.stack)) {
    return [];
  }

  const methods = new Set();

  for (const layer of router.stack) {
    const route = layer && layer.route;

    if (!route || !route.methods) {
      continue;
    }

    for (const [method, enabled] of Object.entries(route.methods)) {
      if (enabled) {
        methods.add(method.toUpperCase());
      }
    }
  }

  return Array.from(methods).sort();
}

function registerRoutes(app, { basePath = "" } = {}) {
  for (const { path, router } of ROUTE_DEFINITIONS) {
    app.use(`${basePath}${path}`, router);
  }

  return function listRegisteredRoutes() {
    return ROUTE_DEFINITIONS.map(({ path, router, description }) => ({
      path: `${basePath}${path}`,
      description,
      methods: listRouterMethods(router),
    }));
  };
}

module.exports = {
  ROUTE_DEFINITIONS,
  registerRoutes,
};
