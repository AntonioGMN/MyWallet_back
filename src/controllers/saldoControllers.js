import db from "../db.js";
import dayjs from "dayjs";

export async function postSaldo(req, res) {
	const dados = req.body;
	const user = res.locals.user;

	try {
		await db.collection("saldo").insertOne({
			...dados,
			userID: user._id,
			time: dayjs().format("DD/MM"),
		});
		res.sendStatus(201);
	} catch (erro) {
		console.log(erro);
		res.sendStatus(401);
	}
}

export async function getSaldo(req, res) {
	const user = res.locals.user;

	try {
		const saldo = await db
			.collection("saldo")
			.find({
				userID: user._id,
			})
			.toArray();
		res.send(saldo);
	} catch (erro) {
		console.log(erro);
		res.sendStatus(401);
	}
}

// async function getUser(req) {
// 	const { authorization } = req.headers;

// 	const token = authorization?.replace("Bearer ", "");
// 	if (!token) return res.sendStatus(401);

// 	const session = await db.collection("sessions").findOne({ token });
// 	if (!session) return res.sendStatus(401);

// 	const user = await db.collection("users").findOne({ _id: session.userID });
// 	if (!user) return res.sendStatus(401);

// 	return user;
// }
