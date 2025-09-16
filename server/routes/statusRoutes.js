import { Router } from "express";
import { update } from "../ctrl/statusCtrl.js";

const status = Router();

status.post("/update", update);

export default status;
