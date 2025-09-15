import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getDirectSoldiers } from "../ctrl/reportCtrl.js";

const report = express.Router();

// report.use(checkAuth);
report.get("/:personalNumber", getDirectSoldiers);

export default report;
