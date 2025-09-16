import express from "express";
import cors from "cors";
import { configRoutes } from "./routes/configRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./middelware/logger.js";
import { mapSoldiers } from "./services/mapSoldires.js";
config();


const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(logger);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

configRoutes(app);

app.use((req, res) => {
  res.status(404).send({ msg: "page is not defound." });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
