import express from 'express';
import middlewares from '../middlewares/middlewares';
import controller from '../controllers/entries';

const router = express.Router();

router.route('/(:id)?')
	  .all(middlewares.auth)
	  .post(controller.create)
	  .get(controller.read)
	  .patch(controller.update)
	  .delete(controller.delete)


export default router;