const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const mongosanitize = require("express-mongo-sanitize");

const xss = require("xss-clean"); // Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.

const bodyParser = require("body-parser"); // Node.js body parsing middleware.

// Parses incoming request bodies in a middleware before your handlers, available under the req.body property.

const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cookieParser = require("cookie-parser"); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const session = require("cookie-session"); // Simple cookie-based session middleware.
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limited = rateLimit({
  max: 3000,
  windowMS: 60 * 60 * 1000, //1hour
  message: "Too many request from this IP",
});
app.use("/auth", limited);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(mongosanitize());
app.use(xss());

app.use(routes);

module.exports = app;
