import express from 'express';
import users from './users';
import responses from '../helpers/responses';

const router = express.Router();

router.get('/', (req, res, next) => res.status(200).json('Hello World'));
router.use('/api/v1/auth', users);


//Errors
router.use('/*', responses['err']);

export default router;