import { getDirectSoldiersDB, getDirectSoldiersWithReportsDB, getSoldierByIdDB } from "../DAL/soldierDAL.js";
import { mapSoldiers } from "../services/mapSoldires.js";


export const getDirectSoldiers = async (req, res) => {
    const personalNumber = req.params.personalNumber;
    let response;
    try {
        response = await getDirectSoldiersDB(personalNumber);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "The request failed." })
    }
    res.json(response);
}

export const getDirectSoldiersWithReports = async (req, res) => {
    const personalNumber = req.params.personalNumber;
    let response;
    try {
        response = await getDirectSoldiersWithReportsDB(personalNumber);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: "The request failed." })
    }
    res.json(response);
}

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
        return res.status(400).json({ msg: "The request failed." })
    }
    res.json(response);
}