import BaseService from './BaseService';
import { IUser, User } from './models/User';

class UsersService extends BaseService {
  private constructor() {
    super('http://localhost:3001/users/');
  }

  public async getUsers(): Promise<User[]> {
    const response = await this.get('');
    const data = (await response.json()) as IUser[];
    return data.map((userData) => new User(userData));
  }

  public async getUser(id: string): Promise<User> {
    const response = await this.get(`${id}`);
    const data = (await response.json()) as IUser;
    return new User(data);
  }

  public async deleteUser(id: string): Promise<boolean> {
    const response = await this.delete(`${id}`);
    return response.ok;
  }

  public async deleteUsers(ids: readonly string[]): Promise<boolean> {
    const results = await Promise.all(ids.map((id) => this.deleteUser(id)));
    return results.every((result) => result);
  }

  // TODO Add deleteUser, createUser, updateUser

  private static instance: UsersService;

  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }
}

export default UsersService;
