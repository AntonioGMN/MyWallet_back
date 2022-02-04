import express from "express";
import { getSaldo, postSaldo } from "../controllers/saldoControllers.js";
import validaSchemaSaldo from "../middlewares/validateSaldo.js";
import validateToken from "../middlewares/validateToken.js";

const saldoRoute = express.Router();
saldoRoute.use(validateToken);
saldoRoute.post("/saldo", validaSchemaSaldo, postSaldo);
saldoRoute.get("/saldo", getSaldo);

export default saldoRoute;
