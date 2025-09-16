import { Router } from "express";
import { subscribe, unsubscribe } from "../ctrl/pushCtrl.js";

const push = Router();

push.post("/subscribe", subscribe);

push.delete("/unsubscribe", unsubscribe);

export default push;
