import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentService implements OnModuleInit {
  constructor(@Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    return this.paymentClient.send('process_payment', JSON.stringify(makePaymentDto));
  }

  onModuleInit() {
    this.paymentClient.subscribeToResponseOf('process_payment');
  }
}
