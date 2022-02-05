import joi from "joi";

const saldoSchema = joi.object({
	descrição: joi.string().required(),
	valor: joi.number().required(),
	type: joi.valid("saída", "entrada").required(),
});

export default saldoSchema;
