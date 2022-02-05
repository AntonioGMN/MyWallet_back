import express from "express";
import { getUser, logout } from "../controllers/userConstroles.js";
import validateToken from "../middlewares/validateToken.js";

const userRoute = express.Router();

userRoute.get("/user", getUser);
userRoute.delete("/logout", validateToken, logout);

export default userRoute;
