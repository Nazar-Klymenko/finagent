import path from "path";
import fs from "fs";
const __dirname = path.resolve();
import express from "express";
const app = express();

import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";
import morgan from "morgan";

import userRoute from "./routes/v1/frontend/user.js";
import userAuthRoute from "./routes/v1/frontend/auth.js";
import userApplicationRoute from "./routes/v1/frontend/application.js";

import adminRoute from "./routes/v1/adminPanel/admin.js";
import adminAuthRoute from "./routes/v1/adminPanel/auth.js";
import adminApplicationRoute from "./routes/v1/adminPanel/applications.js";

import admin from "firebase-admin";

const config = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};
let auth;
try {
  const userInstance = admin.initializeApp(
    {
      credential: admin.credential.cert(config),
    },
    "auth"
  );
  auth = userInstance.auth();
} catch (error) {
  console.log(error);
}

const adminConfig = {
  type: process.env.FIREBASE_TYPE_ADMIN,
  project_id: process.env.FIREBASE_PROJECT_ID_ADMIN,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID_ADMIN,
  private_key: process.env.FIREBASE_PRIVATE_KEY_ADMIN.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL_ADMIN,
  client_id: process.env.FIREBASE_CLIENT_ID_ADMIN,
  auth_uri: process.env.FIREBASE_AUTH_URI_ADMIN,
  token_uri: process.env.FIREBASE_TOKEN_URI_ADMIN,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL_ADMIN,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL_ADMIN,
};
let adminAuth;
try {
  const adminInstance = admin.initializeApp(
    {
      credential: admin.credential.cert(adminConfig),
    },
    "admin"
  );
  adminAuth = adminInstance.auth();
} catch (error) {
  console.log(error);
}

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
      "http://192.168.1.3:3000",
      "https://app.finagent.eu",
      "https://admin.finagent.eu",
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
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
  });
});

export { app, auth, adminAuth };
