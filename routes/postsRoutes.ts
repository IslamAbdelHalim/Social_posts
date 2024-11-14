import express from 'express';
import {
    createPostHandler,
    deletePostByIdHandler,
    getAllPostsHandler,
    getPostByIdHandler
} from '../controllers/postsControllers';

const router = express.Router();

router
    .route('/')
    .get(getAllPostsHandler)
    .post(createPostHandler);

router
    .route('/:id')
    .get(getPostByIdHandler)
    .delete(deletePostByIdHandler);

export default router;