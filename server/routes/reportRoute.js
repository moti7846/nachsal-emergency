import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { createReport, getDirectSoldiersWithReports, getSoldierDetails, isAlertOn, SendNachsal } from "../ctrl/reportCtrl.js";

const report = express.Router();

//בודק אם קיים טוקן תקין
report.use(checkAuth);

report.get("/send_nachsal", SendNachsal);
report.get("/:personalNumber", getDirectSoldiersWithReports);
report.get("/alert_on/:personalNumber", isAlertOn);
report.get("/soldierDetails/:personalNumber", getSoldierDetails);
report.post("/add_report/:personalNumber", createReport)

export default report;
