import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikesDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { InMemoryDataStore } from './databases';
import { DbStore } from './db/dbSql';

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao {}

export let db: DataStore;

export async function initDb() {
  // db = new InMemoryDataStore();
  db = await new DbStore().openDb();
}
