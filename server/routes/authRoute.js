import express from "express";
import { login, logout, changePassword, soldierVerification } from "../ctrl/accountCtrl.js";

const auth = express.Router();

auth.post('/changePassword', changePassword);
auth.post('/login', login);
auth.post('/logout', logout);
auth.get('/me', soldierVerification)

export default auth
