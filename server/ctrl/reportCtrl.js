import {
  getDirectSoldiersDB,
  getDirectSoldiersWithReportsDB,
  getSoldierByIdDB,
} from "../DAL/soldierDAL.js";
import {
  createReportDB,
  isAlertOnTrueDB,
  setAlertOnTrueDB,
} from "../DAL/reportDAL.js";
import { mapSoldiers } from "../services/mapSoldiers.js";

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
  try {
    const personalNumber = req.params.personalNumber;
    const arraySoldires = await mapSoldiers(personalNumber);
    for (const soldier of [personalNumber, ...arraySoldires]) {
      await setAlertOnTrueDB(soldier);
    }

    return res.json({ msg: "success" });
  } catch (error) {
    console.log("SendNachsal failed");
    return res.status(500).json({ msg: "failed" });
  }
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
    const isTrue = await createReportDB(
      { ...req.body, done: true },
      req.params.personalNumber
    );
    if (isTrue) return res.json({ msg: "Report added successfully" });
    else res.status(403).json({ msg: "create report failed" });
  } catch (error) {
    console.log("create Report error: ", error);
    res.status(500).json({ msg: "create report failed" });
  }
};

export const isAlertOn = async (req, res) => {
  try {
    const alert = await isAlertOnTrueDB(req.params.personalNumber);
    res.json(alert);
  } catch (error) {
    console.log("is alert on error: ", error);
    res.status(500).json({ msg: "is alert on failed" });
  }
};
