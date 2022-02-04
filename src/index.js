import express, { json } from "express";
import cors from "cors";

import authRoute from "./routes/authRouter.js";
import saldoRoute from "./routes/saldoRouter.js";
import userRoute from "./routes/userRouter.js";

const serve = express();
serve.use(cors());
serve.use(express.json());

serve.use(authRoute);
serve.use(saldoRoute);
serve.use(userRoute);

serve.listen(5000, () => console.log("ouvindo"));
