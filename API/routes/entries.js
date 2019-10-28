import express from 'express';
import responses from '../helpers/responses';
import controller from '../controllers/entries';

const router = express.Router();

router.route('/(:id)?')
	  //.all(auth)
	  .post(controller.create)
	  .get(controller.read)
	  .patch(controller.update)
	  .delete(controller.delete)


export default router;