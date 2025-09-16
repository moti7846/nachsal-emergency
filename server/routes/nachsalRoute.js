// import express from "express";
// import { reset } from "../ctrl/nachsalCtrl.js"

// const nachsal = express.Router();

// nachsal.get("/_ping", (req, res) => res.json({ ok: true })); // DEBUG
// nachsal.put('/reset', reset)

// export default nachsal

// routes/nachsalRoute.js
import express from "express";
import { reset } from "../ctrl/nachsalCtrl.js";

console.log("[routes] loading nachsal router"); // DEBUG: should print on server boot

const nachsal = express.Router();

nachsal.get("/_ping", (req, res) => res.json({ ok: true, router: "nachsal" })); // DEBUG
nachsal.put("/reset", reset);

export default nachsal;
