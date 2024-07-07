import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class globalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('exception');
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const statusCode: number = exception instanceof HttpException
      ? exception.getStatus()
      : ('code' in exception)
        ? (exception.code as number)
        : HttpStatus.INTERNAL_SERVER_ERROR
    const message: string = ('message' in exception) ?  exception.message : 'Internal server error'

    this.logger.error(`error message => ${message}, trace => ${exception.stack}`);

    response.status(statusCode).json({
      code: statusCode,
      message,
    });
  }
}
