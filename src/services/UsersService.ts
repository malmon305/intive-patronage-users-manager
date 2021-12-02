import BaseService from './BaseService';
import Page from './models/Page';
import { IUser, User } from './models/User';

class UsersService extends BaseService {
  private constructor() {
    super('http://localhost:3001/users/');
  }

  public async getUsers(pageNumber: number, pageCount: number): Promise<Page<User>> {
    const response = await this.get(`?_page=${pageNumber}&_limit=${pageCount}`);

    const page = new Page<User>();
    const data = (await response.json()) as IUser[];

    page.items = data.map((userData) => new User(userData));

    if (response.headers.has('X-Total-Count')) {
      page.totalCount = parseInt(response.headers.get('X-Total-Count')!, 10);
    }

    return page;
  }

  public async getUser(id: string): Promise<User> {
    const response = await this.get(`${id}`);
    const data = (await response.json()) as IUser;
    return new User(data);
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
