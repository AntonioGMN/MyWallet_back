import express from "express";
import { signUp, signIn } from "../controllers/authConstroller.js";
import validateSignUp from "../middlewares/validateSignUp.js";

const authRoute = express.Router();
authRoute.post("/sign-up", validateSignUp, signUp);
authRoute.post("/sign-in", signIn);

export default authRoute;
