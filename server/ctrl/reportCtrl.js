import { getDirectSoldiersDB } from "../DAL/soldierDAL.js";

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