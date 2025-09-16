import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getDirectSoldiers, getDirectSoldiersWithReports } from "../ctrl/reportCtrl.js";

const report = express.Router();

report.use(checkAuth);
// report.get("/:personalNumber", getDirectSoldiers);
report.get("/:personalNumber", getDirectSoldiersWithReports);

export default report;
