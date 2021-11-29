import dbCreateConnection from "./services/db.js";

import http from "http";
import { app } from "app";

const port = process.env.PORT || 5000;
const server = http.createServer(app).listen(port, () => {
  console.log("==================================");
  console.log(`🌸 ENV: ${process.env.NODE_ENV}`);
  console.log(`🚢 Port: ${port}`);
  console.log("==================================");
});

dbCreateConnection();
