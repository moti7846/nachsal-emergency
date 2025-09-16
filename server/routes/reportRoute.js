import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getDirectSoldiers, getDirectSoldiersWithReports, getSoldierDetails } from "../ctrl/reportCtrl.js";

const report = express.Router();

report.use(checkAuth);
// report.get("/:personalNumber", getDirectSoldiers);
report.get("/:personalNumber", getDirectSoldiersWithReports);
report.get("/soldierDetails/:personalNumber", getSoldierDetails);

export default report;
