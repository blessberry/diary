import Joi from '@hapi/joi';

const helper = {
		schema : {
		    firstName: Joi.string().min(3).required(),
		    lastName: Joi.string().min(3).required(),
		    email: Joi.string().email().required(),
		    password: Joi.string().min(7).required(),
		},
		validate: (data) => Joi.validate(data, this.schema)
}

export default helper;

 
