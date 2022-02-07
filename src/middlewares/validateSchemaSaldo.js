import saldoSchema from "../schemas/saldoSchema.js";

export default function validaSchemaSaldo(req, res, next) {
	const validation = saldoSchema.validate(req.body, { abortEarly: false });

	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		return res.status(422).send(messageErro);
	}

	next();
}
