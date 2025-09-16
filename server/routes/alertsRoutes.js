import { Router } from "express";
import {activate, metrics} from "../ctrl/alertsCtrl.js";

const alert = Router();

alert.post("/activate", activate);
alert.get("/:id/metrics", metrics);

export default alert;
