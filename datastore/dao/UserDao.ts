import { User } from '../../models/types';

export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  deleteUserById(id: string): Promise<void>;
}