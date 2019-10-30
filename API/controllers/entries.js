import model from '../models/entries';

export default {

	create: (req, res, next) => {
		const entry = req.params.id ? null : model.create(req.body.user, req.body);
		entry 
			? res.status(201).json({status: 201, message: 'Created', data: entry}) 
			: res.status(400).json({status: 400, error: 'Not Created'});
	},
	read: (req, res, next) => {
		const entry = model.read(req.body.user, req.params.id);
		entry 
			? res.status(200).json({status: 200, message: 'OK', data: entry}) 
			: res.status(404).json({status: 404, error: 'Not Found'});
	},
	update: (req, res, next) => {
		const entry = model.update(req.body.user, req.body, req.params.id);
		entry 
			? res.status(200).json({status: 200, message: 'OK', data: entry}) 
			: res.status(404).json({status: 404, error: 'Not Updated'});
	},
	delete: (req, res, next) => {
		const entry = model.delete(req.body.user, req.params.id);
		entry 
			? res.status(200).json({status: 200, message: 'OK', data: entry}) 
			: res.status(404).json({status: 404, error: 'Not Deleted'});
	}
}