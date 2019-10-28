import express from 'express';
import responses from '../helpers/responses';
import helpers from '../helpers/helpers';
import controller from '../controllers/users';

const router = express.Router();


router.route('/signup')
	  .post(controller.create)

router.route('/signin')
	  .post(controller.create)

router.route('/users(/:id)?')
	  .get(controller.read)
	  .patch(controller.update)
	  .delete(controller.delete)

export default router;