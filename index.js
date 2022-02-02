import express, { json } from "express";
import cors from "cors";
import { BSONRegExp, MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";
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

		await db.collection("users").insertOne({
			...user,
			password: passwordHash,
		});

		res.sendStatus(201);
	} catch {
		return res.sendStatus(422);
	}
});

serve.post("/sign-in", async (req, res) => {
	const { email, password } = req.body;

	const user = await db.collection("users").findOne({ email });

	if (user && bcrypt.compareSync(password, user.password)) {
		const token = uuid();

		await db.collection("sessions").insertOne({
			userID: user._id,
			token,
		});

		res.send(token);
	} else return res.sendStatus(401);
});

serve.get("/user", async (req, res) => {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);

	const session = await db.collection("sessions").findOne({ token });
	if (!session) return res.sendStatus(401);

	const user = await db.collection("users").findOne({ _id: session.userId });
	if (!user) return res.sendStatus(401);

	delete user.password;

	res.send(user);
});

serve.listen(5000, () => console.log("ouvindo"));
