import "dotenv/config";
import joi from "./helpers/joi";
import auth from "./helpers/auth";
import message from "../helpers/messages";

export default {
  signup: (req, res, next) => {
    joi(req.body).error
      ? message(res, 422, "error", joi(req.body).error.details[0].message)
      : next();
  },
  auth: (req, res, next) => {
    !auth(req)
      ? message(res, 422, 'error', 'Please Provide a valid authentication token')
      : next();
  }
};
