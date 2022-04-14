import path from "path";
import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

const app: Application = express();

import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import morgan from "morgan";

import frontendRoutes from "./routes/frontend";
import adminRoutes from "./routes/admin";

import adminRoute from "./routes/admin/admin";
import adminAuthRoute from "./routes/admin/auth";
import adminApplicationRoute from "./routes/admin/applications";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 300,
});

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(limiter);

app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "https://localhost:3001",
      "https://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://app.finagent.eu",
      "https://v1.app.finagent.eu",
      "https://admin.finagent.eu",
      "https://v1.admin.finagent.eu",
      "https://www.finagent.eu",
      "https://finagent.eu",
    ],
    preflightContinue: false,
    credentials: true,
    allowedHeaders: ["Content-Type", "authorization"],
  })
);

// app.use(
//   morgan("common", {
//     stream: fs.createWriteStream("./access.log", { flags: "a" }),
//   })
// );

app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});

app.use("/api/v1/user/", frontendRoutes);
app.use("/api/v1/admin/", adminRoutes);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
  });
};
app.use(errorHandler);

export { app };
