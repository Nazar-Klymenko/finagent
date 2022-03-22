import connectToDb from "./services/db";

import http, { Server } from "http";
import { app } from "./app";

const port = process.env.PORT || 5000;
const server: Server = http.createServer(app).listen(port, () => {
  console.log("==================================");
  console.log(`🌸 ENV: ${process.env.NODE_ENV}`);
  console.log(`🚢 Port: ${port}`);
  console.log("==================================");
});

connectToDb();
