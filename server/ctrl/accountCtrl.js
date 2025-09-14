import { updateSoldierDB } from "../DAL/soldierDAL.js";

export const changePassword = async (req, res) => {
    const privateNumber = req.body.privateNumber;
    const password = req.body.newPassword;
    if (!privateNumber || !password) {
        return res.status(403).json({ msg: "You must enter a personal number and password."})
    }
    let response;
    try {
        response = await updateSoldierDB(privateNumber, password);
    }
    catch (err) {
        console.log(`updateSoldierDB: ${err.msg}`);
        res.status(500).json({ msg: "Password change failed." })
    }
    if (!response) {
        res.status(500).json({ msg: "User not found." })
    }
    res.json({ msg: "The update was successful!" })
}

export const login = () => {

}

export const logout = (req, res) => {
    res.clearCookie("token").json({ msg: "Logged out" });
}
