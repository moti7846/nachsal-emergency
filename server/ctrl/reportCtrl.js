import { createReportDB } from "../DAL/reportDAL.js";
import {
  getDirectSoldiersDB,
  getDirectSoldiersWithReportsDB,
} from "../DAL/soldierDAL.js";
import { mapSoldiers } from "../services/mapSoldires.js";

export const getDirectSoldiers = async (req, res) => {
  const personalNumber = req.params.personalNumber;
  let response;
  try {
    response = await getDirectSoldiersDB(personalNumber);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "The request failed." });
  }
  res.json(response);
};

export const getDirectSoldiersWithReports = async (req, res) => {
  const personalNumber = req.params.personalNumber;
  let response;
  try {
    response = await getDirectSoldiersWithReportsDB(personalNumber);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "The request failed." });
  }
  res.json(response);
};

export const SendNachsal = async (req, res) => {
  const arraySoldires = await mapSoldiers(req.params.personalNumber);
  res.send(arraySoldires);
};

export const getSoldierDetails = async (req, res) => {
  const personalNumber = req.params.personalNumber;
  let response;
  try {
    response = await getSoldierByIdDB(personalNumber);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "The request failed." });
  }
  res.json(response);
};

export const createReport = async (req, res) => {
  try {
    const isTrue = await createReportDB({ ...req.body, done: true }, req.params.personalNumber);
    if (isTrue) return res.json({ msg: "√ added report" });
    else res.status(403).json({ msg: "create report failed" });
  } catch (error) {
    console.log("create Report error: ", error);
    res.status(500).json({ msg: "create report failed" });
  }
};
