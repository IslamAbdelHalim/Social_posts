import express from 'express';
import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getPostByIdHandler,
} from '../controllers/postsControllers';
import catchError from '../middlewares/catchError';
import { protectRoute } from '../middlewares/protectRoute';

const router = express.Router();

router.use(protectRoute);

router
  .route('/')
  .get(catchError(getAllPostsHandler))
  .post(catchError(createPostHandler));

router
  .route('/:id')
  .get(catchError(getPostByIdHandler))
  .delete(catchError(deletePostByIdHandler));

export default router;
