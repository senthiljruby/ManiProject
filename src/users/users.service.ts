import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: process.env.USER_ACCOUNT_NAME_1,
      password: process.env.USER_ACCOUNT_PASSWORD_1,
    },
    {
      userId: 2,
      username: process.env.USER_ACCOUNT_NAME_2,
      password: process.env.USER_ACCOUNT_PASSWORD_2,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
