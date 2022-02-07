import express from "express";
import { getUser, logout } from "../controllers/userConstroles.js";
import validateToken from "../middlewares/validateToken.js";

const userRoute = express.Router();

userRoute.use(validateToken);
userRoute.get("/user", getUser);
userRoute.delete("/logout", logout);

export default userRoute;
