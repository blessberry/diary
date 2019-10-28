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
	}
}