import { checkPasswordIsTrue, createToken } from "../services/loginService.js";

export const signup = () => {};

export const login = async (req, res) => {
  try {
    const { privateNumber, password } = req.body;
    const soldier = await getSoldierByIdDB(privateNumber);
    if (!soldier)
      return res.status(403).json({ msg: "Personal number not found" });
    if (!checkPasswordIsTrue(password, soldier.password))
      return res
        .status(403)
        .json({ msg: "Incorrect personal number or password" });
    const token = createToken(soldier);
    return res.cookies("token", token, { httpOnly: true }).json(soldier);
  } catch (error) {
    console.log("login message error: ", error);
    return res.status(500).json({ msg: "Login failed." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
};
