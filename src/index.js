import express from "express";
import "dotenv/config";

import propertiesRoute from "../routes/propertiesRoute.js";
import hostsRoute from "../routes/hostsRoute.js";
import bookingsRoute from "../routes/bookingsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import usersRoute from "../routes/usersRoute.js";

import loginRoute from "../routes/loginRoute.js";
import errorHandler from "../middleware/errorHandler.js";

import * as Sentry from "@sentry/node";

import morgan from "morgan";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// Gives the timeresponse
app.use(morgan("tiny"));

app.use("/properties", propertiesRoute);
app.use("/bookings", bookingsRoute);
app.use("/reviews", reviewsRoute);
app.use("/users", usersRoute);
app.use("/hosts", hostsRoute);

app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
