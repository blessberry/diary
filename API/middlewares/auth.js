import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../helpers/pg';
import db from '../models/helpers/queries';

export default async (req, res, next) => {
  const header = await req.headers.authorization;

  if (typeof header === 'undefined') res.status(401).json({ status: 'error', data: 'Unauthorised - Header Not Set' });

  jwt.verify(header, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
    if (err) res.status(401).json({ status: 'error', data: 'Unauthorised Token or token not provided' });

    req.user = decoded;
    const user = await pool.query(db.get(decoded.Email));

    if (!user.rows[0]) res.status(401).send({ status: 'error', data: 'You are not authorized to perform this action' });
    next();
  });
};
