import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('process_payment')
  handleProcessPayment(@Payload(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.appService.processPayment(makePaymentDto);
  }
}
