import db from "../db.js";

export async function getUser(req, res) {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);

	const session = await db.collection("sessions").findOne({ token });
	if (!session) return res.sendStatus(401);

	const user = await db.collection("users").findOne({ _id: session.userID });
	if (!user) return res.sendStatus(401);

	res.send(user).Status(200);
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
