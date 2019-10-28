import joi from './helpers/joi';
import helpers from './helpers/helpers';

export default {
	signup: (req, res, next) => {
		const input = joi.validate(req.body).error;
		!input
			? next()
			: res.status(400).json({ 
				status: 400, 
				error: input.details[0].message 
			})
	},
	signin: (req, res, next) => {
		const input = helpers.authenticate(req.body);
		input
			? next()
			: res.status(400).json({
				status: 400, 
				error: 'Please enter a valid token'
			})
	}
}