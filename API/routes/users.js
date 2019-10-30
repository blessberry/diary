import express from 'express';
import middlewares from '../middlewares/middlewares';
import controller from '../controllers/users';

const router = express.Router();

router.route('/signup')
	  .all(middlewares.signup)
	  .post(controller.create)

router.route('/signin')
	  .post(controller.signin)

router.route('/users(/:id)?')
	  //.all(middlewares.auth)
	  .get(controller.read)
	  .patch(controller.update)
	  .delete(controller.delete)

export default router;