import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default (req) => {
	const token = req.headers['x-access-token'] || req.headers['authorization'];
	req.body.user = jwt.verify(token, process.env.KEY).user;

	return (token && req.body.user) ? true : false;
}