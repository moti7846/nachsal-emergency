import express from "express";
import { login, logout, changePassword } from "../ctrl/accountCtrl.js";

const soldiers = express.Router();

soldiers.post('/changePassword', changePassword);
soldiers.post('/login', login);
soldiers.post('/logout', logout);

export {
    soldiers
}
