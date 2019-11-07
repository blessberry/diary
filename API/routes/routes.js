import express from 'express';
import users from './users';
import entries from './entries';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ status: 'success', data: 'Welcome to my diary...' }));
router.use('/api/v2/auth', users);
router.use('/api/v2', entries);

router.use('/*', (req, res) => res.status(404).json({ status: 'error', data: 'Wrong api endpoint, does not exist' }));

export default router;
