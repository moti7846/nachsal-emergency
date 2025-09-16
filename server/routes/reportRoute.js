import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getDirectSoldiers, getDirectSoldiersWithReports, SendNachsal } from "../ctrl/reportCtrl.js";

const report = express.Router();

//בודק אם קיים טוקן תקין
report.use(checkAuth);

report.get("/:personalNumber", getDirectSoldiersWithReports);
report.get("/send_nachsal/:personalNumber", SendNachsal);

export default report;
