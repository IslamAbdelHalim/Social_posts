import express from 'express';
import postRouter from './postsRoutes';

const router = express.Router();

// posts routes
router.use('/posts', postRouter);

export default router;