import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (id, email) => jwt.sign(
  { Id: id, Email: email },
  process.env.JWT_PRIVATE_KEY,
  { expiresIn: '1d' },
);
