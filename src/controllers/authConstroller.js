import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
	const user = req.body;

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
}

export async function signIn(req, res) {
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
}
