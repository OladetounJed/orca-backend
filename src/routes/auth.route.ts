import { Router } from 'express';
import { register } from '../controllers/register.controller';
import { login } from '../controllers/login.controller';
import { session } from '../controllers/session.controller';
import { user } from '../controllers/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/session', session);
router.get('/user', user);

export default router;
