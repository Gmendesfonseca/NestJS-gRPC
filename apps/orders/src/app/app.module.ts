import { Module } from '@nestjs/common';
import { OrdersController } from './app.controller';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [],
})
export class AppModule {}
