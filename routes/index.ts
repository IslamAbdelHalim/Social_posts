import express from 'express';
import postRouter from './postsRoutes';
import userRouter from './userRoutes';

const router = express.Router();

// posts routes
router.use('/posts', postRouter);
router.use('/users', userRouter);

export default router;
