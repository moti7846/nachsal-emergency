import express from "express";
import { reset } from "../ctrl/nachsalCtrl.js";
import { requireAuth } from "../middleware/requireAuth.js";

const nachsal = express.Router();

// The reset route is highly sensitive and requires authentication
nachsal.put("/reset", requireAuth, reset);

export default nachsal;
