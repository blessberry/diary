import express from 'express';
import auth from '../middlewares/auth';
import middlewares from '../middlewares/middlewares';
import controllers from '../controllers/entries';

const router = express.Router();

router.route('/entries')
  .all(auth)
  .post(middlewares.post, controllers.post)
  .get(controllers.get);

router.route('/entries/:id')
  .all(middlewares.params, auth)
  .patch(middlewares.patch, controllers.patch)
  .delete(controllers.delete)
  .get(controllers.pick);

export default router;
