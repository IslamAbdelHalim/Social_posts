import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

import { Comment, Like, Post, User } from '../../models/types';
import { DataStore } from '../dataStore';

export class DbStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await open({
      filename: path.join(__dirname, 'socialApp.db'),
      driver: sqlite3.Database,
    });

    await this.db.run('PRAGMA foreign_key = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO Users (id, firstName, lastName, email, username, password) VALUES (?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.password
    );
  }

  getUserById(userId: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM Users WHERE id = ?', userId);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM Users WHERE email = ?', email);
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM Users WHERE email = ?', username);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.db.run('DELETE FROM Users WHERE email = ?', id);
  }

  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO Posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)',
      post.id,
      post.title,
      post.url,
      post.userId,
      post.postedAt
    );
  }
  getPostById(id: string): Promise<Post | undefined> {
    return this.db.get<Post>('SELECT title, url, postedAt FROM Posts WHERE id = ?', id);
  }
  async deletePostById(id: string): Promise<void> {
    await this.db.run('DELETE FROM Posts WHERE id = ?', id);
  }
  async createLike(like: Like): Promise<void> {
    await this.db.run('INSERT INTO Likes (userId, PostId) VALUES (?,?)', like.userId, like.postId);
  }
  async createComment(comment: Comment): Promise<void> {
    await this.db.run('INSERT INTO Comments (userId, postId, comment, postedAt) VALUES (?,?,?,?,?)',
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt
    )
  }
  listComments(postId: string): Promise<Comment[]> {
    return this.db.all<Comment[]>('SELECT * FROM Comments WHERE postId = ?', postId);
  }
  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM Comments WHERE id = ?', id);
  }

}
