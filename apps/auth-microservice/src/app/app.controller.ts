import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) createUserDto: CreateUserDto) {
    this.appService.createUser(createUserDto);
  }
}
