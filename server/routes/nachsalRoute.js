import express from "express";
import { checkAuth } from "../middelware/auth.js";
import { reset } from "../ctrl/nachsalCtrl.js"

const nachsal = express.Router();

nachsal.use(checkAuth)
nachsal.put('/reset', reset)

export default nachsal