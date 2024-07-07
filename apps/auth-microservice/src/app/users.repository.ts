import { User } from '@nestjs-microservices/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];

  save(user: User): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);

    return newUser;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id) || null;
  }
}
