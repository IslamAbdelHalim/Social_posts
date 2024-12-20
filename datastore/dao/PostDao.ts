import { Post } from '../../models/types';

export interface PostDao {
  listPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<void>;
  getPostById(id: string): Promise<Post | undefined>;
  deletePostById(id: string): Promise<void>;
}

// export class PostsDao {
//   constructor(db) {
//     this.posts = db;
//   }

//   listPost() {
//     return this.posts;
//   }

//   createPost(post) {
//     this.posts.push(post);
//   }

//   getPostById(id) {
//     return this.posts.find((post) => post.id === id);
//   }

//   deletePost(id) {
//     const idx = this.posts.findIndex((p) => p.id === id);
//     if (idx) this.posts.splice(idx, 1);
//   }
// }
