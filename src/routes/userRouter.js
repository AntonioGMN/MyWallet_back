import express from "express";
import { getUser } from "../controllers/userConstroles.js";

const userRoute = express.Router();
userRoute.get("/user", getUser);

export default userRoute;
