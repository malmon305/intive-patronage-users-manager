import Hobby from './Hobby';

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  hobbies: string[];
}

export class User {
  constructor(user: IUser, hobbies: Hobby[]) {
    this.id = user.id;
    this.name = `${user.name} ${user.lastName}`;
    this.email = user.email;
    this.age = user.age;
    this.gender = user.gender;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.dateOfBirth = user.dateOfBirth;
    this.hobbiesIds = user.hobbies;
    this.hobbies = user.hobbies.map((id) => hobbies.find((h) => h.id === id)?.name!);
  }

  public id: string;
  public name: string;
  public email: string;
  public age: number;
  public gender: string;
  public phoneNumber: string;
  public address: string;
  public dateOfBirth: string;
  public hobbiesIds: string[];
  public hobbies: string[];
}
