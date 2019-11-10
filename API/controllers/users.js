import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from '../helpers/jwt';
import db from '../models/helpers/queries';
import pool from '../helpers/pg';

export default {
  signup: async (req, res, next) => {
    try {
      const { firstName, lastName, email } = req.body;
      const rows = await pool.query(db.get(email));

      if (rows.rowCount > 0) return res.status(409).json({ message: 'Email already taken' });
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = await pool.query(db.create(firstName, lastName, email, req.body.password));
      const data = {
        token: jwt(user.rows[0].id, user.rows[0].email),
        info: _.pick(user.rows[0], 'firstName', 'lastName', 'email'),
      };
      return res.status(201).json({ status: 201, message: 'USER CREATED', data });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      const user = await pool.query(db.get(req.body.email));

      if (user.rows.length < 1) return res.status(404).send({ status: 404, message: 'USER DO NOT EXIST' });

      if (!bcrypt.compareSync(req.body.password, user.rows[0].password)) return res.status(404).json({ status: 404, message: 'INCORRECT PASSWORD' });

      const data = {
        token: jwt(user.rows[0].id, user.rows[0].email),
        info: _.pick(user.rows[0], 'firstname', 'lastname', 'email'),
      };
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  },
};
