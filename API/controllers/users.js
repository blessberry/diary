import 'dotenv/config';
import jwt from 'jsonwebtoken';
import model from '../models/users';

export default {
	create: (req, res, next) => {
		const user = req.params.id ? null : model.create(req.body);
		user 
			? res.status(201).json({status: 201, message: 'Created', data: user}) 
			: res.status(400).json({status: 400, error: 'Bad Request'});
	},
	read: (req, res, next) => {
		const user = model.read(req.params.id);
		user 
			? res.status(200).json({status: 200, message: 'OK', data: user}) 
			: res.status(404).json({status: 404, error: 'Not Found'});
	},
	update: (req, res, next) => {
		const user = model.update(req.body, req.params.id);
		user 
			? res.status(200).json({status: 200, message: 'OK', data: user}) 
			: res.status(404).json({status: 404, error: 'Not Found'});
	},
	delete: (req, res, next) => {
		const user = model.delete(req.params.id);
		user 
			? res.status(200).json({status: 200, message: 'OK', data: user}) 
			: res.status(404).json({status: 404, error: 'Not Found'});
	},
	signin: (req, res, next) => {
  		const user = model.email(req.body.email);
  		(user.password !== req.body.password)
  			? res.json({status: 500, error: 'User Not Found'})
  			: res.json({status: 200, message: 'OK', data: {token: jwt.sign({ user: user.id }, process.env.KEY)}})
  	},
  	user: (jwt) => {
		  const user = model.user(jwt.user);
		  return user ? user : false;
	  }

  		
}