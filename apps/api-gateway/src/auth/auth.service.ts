import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send('create_user', JSON.stringify(createUserDto))
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
    this.authClient.subscribeToResponseOf('get_user');
  }
}
