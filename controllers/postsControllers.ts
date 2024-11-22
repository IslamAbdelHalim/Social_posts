import crypto from 'crypto';
import { RequestHandler } from 'express-serve-static-core';

import { db } from '../datastore/dataStore';
import { Post } from '../models/types';

/**
 * @desc get all posts
 * @routes /posts
 * @method get
 * @access public
 */
export const getAllPostsHandler: RequestHandler = async (req, res) => {
  const posts = await db.listPosts();
  res.status(200).json({ posts });
};

/**
 * @desc get post By id
 * @routes /posts/:id
 * @method get
 * @access public
 */
export const getPostByIdHandler: RequestHandler = (req, res) => {
  const id = req.params.id;
  const post = db.getPostById(id);
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
 * @method post
 * @access public
 */
export const createPostHandler: RequestHandler = async (req, res) => {
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

  await db.createPost(post);
  res.status(201).json({ message: 'Post is created' });
};

/**
 * @desc Delete Post By id
 * @routes /posts/:id
 * @method delete
 * @access public
 */
export const deletePostByIdHandler: RequestHandler = async (req, res) => {
  const id = req.params.id;
  await db.deletePostById(id);
  res.status(204);
};
