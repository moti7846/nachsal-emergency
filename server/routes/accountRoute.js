import express from "express";
import { login, logout, signup, UserVerification } from "../ctrl/accountCtrl.js";

const soldiers = express.Router();

soldiers.post('/signup', signup);
soldiers.post('/login', login);
soldiers.post('/logout', logout);

export {
    soldiers
}
