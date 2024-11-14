import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikesDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao {}
