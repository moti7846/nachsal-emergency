import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { createReport, getAllSoldiersUnderCommand, getDirectSoldiersWithReports, getSoldierDetails, isAlertOn, SendNachsal } from "../ctrl/reportCtrl.js";

const report = express.Router();

//בודק אם קיים טוקן תקין
report.use(checkAuth);

report.get("/:personalNumber", getDirectSoldiersWithReports);
report.get("/send_nachsal/:personalNumber", SendNachsal);
report.get("/alert_on/:personalNumber", isAlertOn);
report.get("/soldierDetails/:personalNumber", getSoldierDetails);
// report.get("/get_all_soldiers_under_command/:personalNumber", getAllSoldiersUnderCommand);
report.post("/add_report/:personalNumber", createReport)

export default report;
