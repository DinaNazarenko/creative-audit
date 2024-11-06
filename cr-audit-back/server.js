import express from "express";
import { serverConfig } from "./config/server.config.js";
import { router } from "./routes/index.routes.js";

const app = express();
const PORT = 4000;
serverConfig(app);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port ***`);
});
