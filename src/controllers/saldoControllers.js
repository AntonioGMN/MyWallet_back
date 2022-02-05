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
