
export enum UserRole{
  USER = 'User',
  ADMINISTRATOR = 'Administrator'
}

export class User{
  id: number;
  name: string;
  password: string;
  role: UserRole


  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}


export class UserUpdate{
  id: number;
  role: string;


  constructor(id: number, role: string) {
    this.id = id;
    this.role = role;
  }
}
