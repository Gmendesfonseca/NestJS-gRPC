import { ORDERS_PACKAGE_NAME } from 'types/proto/orders';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || '5001';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ORDERS_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/orders.proto'),
        url: `0.0.0.0:${port}`,
      },
    },
  );
  await app.listen();

  Logger.log(`🚀 Orders Application is running on gRPC channel`);
}

bootstrap();
