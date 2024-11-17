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

    this.db.run('PRAGMA foreign_key = ON;');

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
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM Users WHERE email = ?', email);
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM Users WHERE email = ?', username);
  }

  deleteUserById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  deletePostById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
