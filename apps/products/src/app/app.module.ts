import { Module } from '@nestjs/common';
import { ProductsController } from './app.controller';
@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [],
})
export class AppModule {}
