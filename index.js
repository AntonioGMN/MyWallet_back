import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import joi from "joi";
dotenv.config();

const serve = express();
serve.use(cors());
serve.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
	db = mongoClient.db("mywallet");
});

serve.post("/sign-up", async (req, res) => {
	const user = req.body;

	const userSchema = joi.object({
		name: joi.string().required(),
		email: joi.string().required(),
		password: joi.string().required(),
	});

	const validation = userSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		return res.status(422).send(messageErro);
	}

	try {
		const passwordHash = bcrypt.hashSync(user.password, 10);

		const newUser = await db.collection("users").insertOne({
			...user,
			password: passwordHash,
		});

		res.send(201);
	} catch {
		return res.sendStatus(401);
	}
});

serve.listen(5000, () => console.log("ouvindo"));
