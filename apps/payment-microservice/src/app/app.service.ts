import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { logger } from 'nx/src/utils/logger';
import { map } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {
  }

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    return this.authClient.send('get_user', JSON.stringify({ userId }))
      .pipe(
        map(user => {
          if (!user) {
            this.throwError(HttpStatus.NOT_FOUND, `User ${userId} not found`);
          }
          if (amount < 100) {
            this.throwError(HttpStatus.BAD_REQUEST, 'Amount cannot be less than 100');
          }

          logger.log(`Process payment for user ${user?.name} - amount: ${amount}`);
          // TODO process payment

          return { amount, user };
        })
      );
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('create_user');
  }

  private throwError(code: HttpStatus, message: string) {
    throw new RpcException({
      code,
      message,
      response: { message, code }
    });
  }
}
