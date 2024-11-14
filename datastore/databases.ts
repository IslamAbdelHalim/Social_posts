// import { CommentDao } from './dao/CommentDao';
import { Comment, Like, Post, User } from '../models/types';
import { DataStore } from './dataStore';

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  private comment: Comment[] = [];

  createUser(user: User): void {
    this.users.push(user);
  }
  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
  deleteUserById(id: string): void {
    this.users.filter((user) => user.id !== id);
  }
  listPosts(): Post[] {
    return this.posts;
  }
  createPost(post: Post): void {
    this.posts.push(post);
  }
  getPostById(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }
  deletePostById(id: string): void {
    this.posts.filter((post) => post.id === id);
  }
  createLike(like: Like): void {
    this.likes.push(like);
  }
  createComment(comment: Comment): void {
    this.comment.push(comment);
  }
  listComments(postId: string): Comment[] {
    return this.comment;
  }
  deleteComment(id: string): void {
    this.comment.filter((comment) => comment.id !== id);
  }
}
