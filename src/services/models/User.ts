import { format } from 'date-fns';
import Hobby from './Hobby';

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number | undefined;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  hobbies: string[];
}

export class User {
  static toAny(user: User, hobbies: Hobby[]): IUser {
    const parts = user.name.split(' ');

    return {
      id: user.id,
      name: parts[0],
      lastName: parts[1],
      email: user.email,
      age: user.age ?? 0,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dateOfBirth: format(user.dateOfBirth, 'yyyy-MM-dd'),
      hobbies: user.hobbies.map((hobbyName) => hobbies.find((hobby) => hobby.name === hobbyName)?.id!)
    };
  }

  static fromAny(obj?: any): User {
    return new this(
      {
        id: '',
        name: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        hobbies: [],
        ...obj
      },
      []
    );
  }

  constructor(user: IUser, hobbies: Hobby[]) {
    this.id = user.id;
    this.name = `${user.name} ${user.lastName}`;
    this.email = user.email;
    this.age = user.age;
    this.gender = user.gender;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.dateOfBirth = user.dateOfBirth ? new Date(user.dateOfBirth) : new Date();
    this.hobbiesIds = user.hobbies;
    this.hobbies = user.hobbies.map((id) => hobbies.find((h) => h.id === id)?.name!);
  }

  public id: string;
  public name: string;
  public email: string;
  public age: number | undefined;
  public gender: string;
  public phoneNumber: string;
  public address: string;
  public dateOfBirth: Date;
  public hobbiesIds: string[];
  public hobbies: string[];
}
