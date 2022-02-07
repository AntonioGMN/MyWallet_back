import db from "../db.js";

export async function getUser(req, res) {
	try {
		const user = res.locals.user;
		res.send(user).Status(200);
	} catch {
		res.sendStatus(500);
	}
}

export async function logout(req, res) {
	const user = res.locals.user;

	try {
		await db.collection("sessions").deleteMany({ userID: user._id });
		res.sendStatus(202);
	} catch {
		console.log(error);
		res.sendStatus(400);
	}
}
