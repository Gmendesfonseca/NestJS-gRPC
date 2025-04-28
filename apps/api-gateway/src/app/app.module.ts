import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';
import { ORDERS_PACKAGE_NAME } from 'types/proto/orders';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductController } from './products/product.controller';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
        },
      },
      {
        name: ORDERS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ORDERS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/orders.proto'),
          url: `0.0.0.0:5001`,
        },
      },
    ]),
  ],
  controllers: [ProductController, OrdersController],
  providers: [],
})
export class AppModule {}
