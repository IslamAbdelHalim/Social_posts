import { Like } from '../../models/types';

export interface LikeDao {
  createLike(like: Like): void;
}

// export class LikesDao {
//   constructor(db) {
//     this.likes = db;
//   }

//   createLike(like) {
//     this.likes.push(like);
//   }
// }