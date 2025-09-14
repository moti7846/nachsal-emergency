import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { getPresence } from "../ctrl/presenceCtrl.js";

const presence = express.Router();

presence.use(checkAuth);
presence.get("/presence", getPresence);

export default presence;
