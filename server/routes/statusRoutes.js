import { Router } from "express";
import { update } from "../ctrl/statusCtrl.js";
import { requireAuth } from "../middelware/requireAuth.js";

const status = Router();

// All routes in this file require authentication
status.use(requireAuth);

status.post("/update", update);

export default status;
