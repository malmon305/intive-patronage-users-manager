import BaseService from './BaseService';
import HobbiesService from './HobbiesService';
import { IUser, User } from './models/User';

class UsersService extends BaseService {
  private constructor() {
    super('http://localhost:3001/users/');
  }

  public async getUsers(): Promise<User[]> {
    const hobbiesService = HobbiesService.getInstance();
    const hobbies = await hobbiesService.getHobbies();

    const response = await this.get('');
    const data = (await response.json()) as IUser[];
    return data.map((userData) => new User(userData, hobbies));
  }

  public async getUser(id: string): Promise<User> {
    const hobbiesService = HobbiesService.getInstance();
    const hobbies = await hobbiesService.getHobbies();

    const response = await this.get(`${id}`);
    const data = (await response.json()) as IUser;
    return new User(data, hobbies);
  }

  public async createUser(user: User): Promise<string> {
    const hobbiesService = HobbiesService.getInstance();
    const hobbies = await hobbiesService.getHobbies();

    const newUser: IUser = User.toAny(user, hobbies);

    const response = await this.post('', newUser);
    const data = await response.json();
    return data.id;
  }

  public async updateUser(user: User): Promise<void> {
    const hobbiesService = HobbiesService.getInstance();
    const hobbies = await hobbiesService.getHobbies();

    const updatedUser: IUser = User.toAny(user, hobbies);

    await this.put(`${updatedUser.id}`, updatedUser);
  }

  public async deleteUser(id: string): Promise<boolean> {
    const response = await this.delete(`${id}`);
    return response.ok;
  }

  public async deleteUsers(ids: readonly string[]): Promise<boolean> {
    const results = await Promise.all(ids.map((id) => this.deleteUser(id)));
    return results.every((result) => result);
  }

  private static instance: UsersService;

  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }
}

export default UsersService;
