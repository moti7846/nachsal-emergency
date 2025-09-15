import express from "express";
import { subscribe, getKey } from "../ctrl/pushCtrl.js";

const vapid = express.Router();

vapid.get("/key", getKey);
vapid.post("/subscribe", subscribe);

export default vapid;
