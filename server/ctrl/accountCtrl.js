import { getSoldierByIdDB, updateSoldierDB } from "../DAL/soldierDAL.js";
import { checkPasswordIsTrue, createHashPassword, createToken } from "../services/loginService.js";

export const changePassword = async (req, res) => {
    const { personalNumber, newPassword } = req.body;    
    if (!personalNumber || !newPassword) {
        return res.status(403).json({ msg: "You must enter a personal number and password."})
    }
    const hashPassword = await createHashPassword(newPassword);
    let response;
    try {
        response = await updateSoldierDB(personalNumber, hashPassword);
    }
    catch (err) {
        console.log(`updateSoldierDB: ${err.msg}`);
        return res.status(500).json({ msg: "Password change failed." })
    }
    if (!response) {
        return res.status(500).json({ msg: "User not found." })
    }
    res.json({ msg: "The update was successful!" })
}

export const login = async (req, res) => {
  try {
    const { personalNumber, password } = req.body;    
    const soldier = await getSoldierByIdDB(personalNumber);

    if (!soldier)
      return res.status(403).json({ msg: "Personal number not found" });
    if (!checkPasswordIsTrue(password, soldier.password))
      return res.status(403).json({ msg: "Incorrect personal number or password" });
    const token = createToken(soldier);
    return res.cookie("token", token, { httpOnly: true }).json(soldier);
  } catch (error) {
    console.log("login message error: ", error);
    return res.status(500).json({ msg: "Login failed." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
};
