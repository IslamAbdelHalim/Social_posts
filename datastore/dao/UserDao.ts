import { User } from '../../models/types';

export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  deleteUserById(id: string): Promise<void>;
}

// export class UserDao {

//   constructor(db){
//     this.users = db;
//   }

//   createUser(user){
//     this.users.push(user)
//   }

//   getUserByEmail(email){
//     return this.users.find(user => user.email === email);
//   }

//   getUserByUsername(username){
//     return this.users.find(user => user.username === username);
//   }

//   deleteUserById(id){
//     const index = this.users.findIndex(user => user.id === id);;

//     if (index) this.users.splice(index, 1)
//   }
// }
