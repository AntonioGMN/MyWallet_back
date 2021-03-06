import db from "../db.js";

export default async function validateToken(req, res, next) {
	const { authorization } = req.headers;
	
	const token = authorization?.replace("Bearer ", "");
	
	const session = await db.collection("sessions").findOne({ token });
	if (!session) return res.sendStatus(401);

	const user = await db.collection("users").findOne({ _id: session.userID });
	if (!user) return res.sendStatus(401);

	res.locals.user = user;
	next();
}
