import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getDirectSoldiers, SendNachsal } from "../ctrl/reportCtrl.js";

const report = express.Router();

report.use(checkAuth);
report.get("/:personalNumber", getDirectSoldiers);
report.get("/send_nachsal/:personalNumber", SendNachsal);

export default report;
