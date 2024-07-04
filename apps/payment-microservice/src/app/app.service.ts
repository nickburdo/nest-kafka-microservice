import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {
  }

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('***** process payment', amount, 'for', userId);
    this.authClient.send('get_user', JSON.stringify({ userId }))
      .subscribe((user: User) => {
        if (user) {
          console.log(`***** process payment for user ${user?.name} - amount: ${amount}`);
        } else {
          console.log(`***** user ${userId} not found`);
        }
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
