import express from 'express';
import controller from '../controllers/users';

const router = express.Router();


router.route('/signup')
	  .post(controller.create)


router.route('/users(/:id)?')
	  .get(controller.read)
	  .patch(controller.update)
	  .delete(controller.delete)

export default router;