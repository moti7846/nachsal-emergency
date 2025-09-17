import express from "express";
import { requireAuth } from "../middelware/requireAuth.js";
import { createReport, getDirectSoldiersWithReports, getSoldierDetails, SendNachsal } from "../ctrl/reportCtrl.js";

const report = express.Router();

// All routes in this file require a valid token
report.use(requireAuth);

report.get("/:personalNumber", getDirectSoldiersWithReports);
report.get("/send_nachsal/:personalNumber", SendNachsal);
report.get("/soldierDetails/:personalNumber", getSoldierDetails);
report.post("/add_report/:personalNumber", createReport)

export default report;
