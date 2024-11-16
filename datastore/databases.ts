// import { CommentDao } from './dao/CommentDao';
import { Comment, Like, Post, User } from '../models/types';
import { DataStore } from './dataStore';

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  private comment: Comment[] = [];

  async createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.users.find((user) => user.email === email);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }
  deleteUserById(id: string): Promise<void> {
    this.users.filter((user) => user.id !== id);
    return Promise.resolve();
  }
  async listPosts(): Promise<Post[]> {
    return await this.posts;
  }
  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
  async getPostById(id: string): Promise<Post | undefined> {
    return await this.posts.find((post) => post.id === id);
  }
  deletePostById(id: string): Promise<void> {
    this.posts.filter((post) => post.id === id);
    return Promise.resolve();
  }
  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
  createComment(comment: Comment): Promise<void> {
    this.comment.push(comment);
    return Promise.resolve();
  }
  async listComments(postId: string): Promise<Comment[]> {
    return await this.comment;
  }
  deleteComment(id: string): Promise<void> {
    this.comment.filter((comment) => comment.id !== id);
    return Promise.resolve();
  }
}
