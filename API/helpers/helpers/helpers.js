import joi from './joi';
import jwt from './jwt';

export default {
	validate: (req) => {
		return joi(req).error
	      ? { status: 400, error: helper.validate(req.body).error.details[0].message }
	      : null;
	},
	authenticate: (req) => {
		return jwt(req) ? req : null;
	}
}