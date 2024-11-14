import { Comment } from '../../models/types';

export interface CommentDao {
  createComment(comment: Comment): void;
  listComments(postId: string): Comment[];
  deleteComment(id: string): void;
}

// export class CommentDao {
//   constructor(db){
//     this.comments = db;
//   }

//   createComment(comments) {
//     this.comments.push(comments);
//   }

//   listComments(postId){
//     return this.comments.filter(c => c.postId === c.postId);
//   }

//   deleteComment(id){
//     const idx = this.comments.findIndex(c => c.id === id);
//     if(id) this.comments.splice(idx, 1);
//   }

// }
