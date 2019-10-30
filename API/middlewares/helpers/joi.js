import Joi from '@hapi/joi';

const schema = Joi.object({
	firstName: Joi.string().alphanum().min(3).max(30).required(),
	lastName: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().min(6).required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

export default	(req) => schema.validate(req);