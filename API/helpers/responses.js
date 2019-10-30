
export default {
	200: 'OK',
	201: 'Created',
	204: 'No Content',
	304: 'Not Modified',
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	409: 'Conflict',
	500: 'Internal Server Error',
	err: (err, req, res, next) => {
		res.status(401).json({status: 401, error: 'Not valid request'})
	},
	error: (res, code, message) => res.status(statusCode).json({ status: 'error', message })
}