import BaseService from './BaseService';
import Hobby from './models/Hobby';

class HobbiesService extends BaseService {
  private constructor() {
    super('http://localhost:3001/hobbies/');
  }

  private HobbiesCache: Hobby[] | undefined;

  public async getHobbies(force: boolean = false): Promise<Hobby[]> {
    if (force || !this.HobbiesCache) {
      const response = await this.get('');
      this.HobbiesCache = (await response.json()) as Hobby[];
    }
    return this.HobbiesCache;
  }

  private static instance: HobbiesService;

  public static getInstance(): HobbiesService {
    if (!HobbiesService.instance) {
      HobbiesService.instance = new HobbiesService();
    }

    return HobbiesService.instance;
  }
}

export default HobbiesService;
