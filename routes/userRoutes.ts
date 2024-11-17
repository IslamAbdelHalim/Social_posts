import express from 'express';
import { login, signUP } from '../controllers/userControllers';

const router = express.Router();

router.route('/auth/signUP').post(signUP);
router.route('/auth/login').post(login);

export default router;
