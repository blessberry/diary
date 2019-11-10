import joi from '../helpers/joi';

export default {
  signup: (req, res, next) => {
    const { error } = joi.signup(req);
    return error ? res.status(422).json({
      status: 'error',
      data: error.details[0].message,
    }) : next();
  },
  signin: (req, res, next) => {
    const { error } = joi.signin(req);
    return error ? res.status(422).json({
      status: 'error',
      data: error.details[0].message,
    }) : next();
  },
  post: (req, res, next) => {
    const { error } = joi.post(req);
    return error ? res.status(422).json({
      status: 'error',
      data: error.details[0].message,
    }) : next();
  },
  patch: (req, res, next) => {
    const { error } = joi.patch(req);
    return error ? res.status(422).json({
      status: 'error',
      data: error.details[0].message,
    }) : next();
  },
  params: (req, res, next) => {
    const { error } = joi.params(req);
    return error ? res.status(400).json({
      status: 'error',
      error: error.details[0].message,
    }) : next();
  },
};
