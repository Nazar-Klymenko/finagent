import adminRoute from "./@routes/admin/admin.js";
import adminApplicationRoute from "./@routes/admin/applications.js";
import adminAuthRoute from "./@routes/admin/auth.js";
import userApplicationRoute from "./@routes/frontend/application.js";
import userAuthRoute from "./@routes/frontend/auth.js";
import userRoute from "./@routes/frontend/user.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import path from "path";
import xss from "xss-clean";

const __dirname = path.resolve();

const app = express();

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
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

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

app.use(express.static(path.resolve(__dirname, "./")));

app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});

app.use("/api/v1/user/", userRoute);
app.use("/api/v1/user/auth/", userAuthRoute);
app.use("/api/v1/user/application/", userApplicationRoute);

app.use("/api/v1/admin/", adminRoute);
app.use("/api/v1/admin/auth/", adminAuthRoute);
app.use("/api/v1/admin/application/", adminApplicationRoute);

app.use((error, req, res, next) => {
  console.log({ error });
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
  });
});

export { app };
