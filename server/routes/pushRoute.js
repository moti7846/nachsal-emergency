import express from "express";
import { subscribe, getKey } from "../ctrl/pushCtrl.js";

const push = express.Router();

push.get("/key", getKey);
push.post("/subscribe", subscribe);

export default push;
