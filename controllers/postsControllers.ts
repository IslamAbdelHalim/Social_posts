import crypto from 'crypto';
import { RequestHandler } from 'express-serve-static-core';
import { InMemoryDataStore } from '../datastore/databases';
import { Post } from '../models/types';

const postsDb = new InMemoryDataStore();

/**
 * @desc get all posts
 * @routes /posts
 * @method GET
 * @access public
 */
export const getAllPostsHandler: RequestHandler = (req, res) => {
  const posts = postsDb.listPosts();
  res.status(200).json({ posts });
};

/**
 * @desc get post By id
 * @routes /posts/:id
 * @method GET
 * @access public
 */
export const getPostByIdHandler: RequestHandler = (req, res) => {
  const id = req.params.id;
  const post = postsDb.getPostById(id);
  if (!post) {
    res.status(404).json({
      status: 'not found',
      message: 'no posts found',
    });
  }
  res.status(200).json({
    status: 'success',
    post,
  });
};

/**
 * @desc create a new Post
 * @routes /posts
 * @method POST
 * @access public
 */
export const createPostHandler: RequestHandler = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  postsDb.createPost(post);
  res.status(201).json({ message: 'Post is created' });
};

/**
 * @desc cDelete Post By id
 * @routes /posts/:id
 * @method DELETE
 * @access public
 */
export const deletePostByIdHandler: RequestHandler = (req, res) => {
  const id = req.params.id;
  postsDb.deletePostById(id);
  res.status(204);
};
