import 'dotenv/config';
import joi from './helpers/joi';
import auth from './helpers/auth';

export default {
	signup: (req, res, next) => {
	    joi(req.body).error
		    ? res.json(joi(req.body).error.details[0].message)
		    : next()
  	},
  	auth: (req, res, next) => {
  		!auth(req)
  			? res.status(401).json({status: 401, error: 'Please Provide a valid authentication token'})
  			: next()
  	}
}