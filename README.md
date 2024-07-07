# Nest.js + Kafka Microservices Mono Repository

Based on [Microservices with NestJS, Kafka, and TypeScript](https://blog.logrocket.com/microservices-nestjs-kafka-typescript/)
by Vijit Ail.

Mono repository contain:
- API gateway
- Auth Microservice
- Payment Microservice

Apache Kafka is used as the transport layer (in Docker).  

The request-response message style is used to exchange messages between microservices.

## API endpoints

### POST/api/auth/sign-up
Create User

Params:
- `name` - String Required
- `email` - Email Required

Request body example:
```json
{
    "name": "Joe Doe",
    "email": "jd@nosend.net"
}
```

### POST/api/payment/pay
Payment by specific user


Params:
- `userId` - Number Exist
- `amount` - Number At list 100

Request body example:
```json
{
  "userId": 1,
  "amount": 100
}
```

## Start the application

```
docker-compose up -d
nx serve api-gateway
nx serve auth-microservice
nx serve payment-microservice
```
