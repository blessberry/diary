import express from 'express';
import middlewares from '../middlewares/middlewares';
import controllers from '../controllers/users';

const router = express.Router();

router.route('/signup')
  .all(middlewares.signup)
  .post(controllers.signup);

router.route('/signin')
  .all(middlewares.signin)
  .post(controllers.signin);

export default router;
