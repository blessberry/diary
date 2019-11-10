import Joi from 'joi';

export default {
  signup: (req) => Joi.validate(req.body, {
    firstName: Joi.string().alphanum().required().min(2).max(20),
    lastName: Joi.string().alphanum().required().min(2).max(20),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
  }),
  signin: (req) => Joi.validate(req.body, {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
  }),
  post: (req) => Joi.validate(req.body, {
    title: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(5),
  }),
  patch: (req) => Joi.validate(req.body, {
    title: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(5),
  }),
  params: (req) => Joi.validate(req.params, {
    id: Joi.number().required().min(1),
  }),
};
