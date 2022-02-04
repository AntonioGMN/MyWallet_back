import signUpSchema from "../schemas/signUpSchema.js";

export default function validateSignUp(req, res, next) {
	const user = req.body;

	const validation = signUpSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		return res.status(422).send(messageErro);
	}

	next();
}
