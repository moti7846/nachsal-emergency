import express from "express";
import { login, logout, changePassword } from "../ctrl/accountCtrl.js";

const auth = express.Router();

auth.post('/changePassword', changePassword);
auth.post('/login', login);
auth.post('/logout', logout);

export default auth
