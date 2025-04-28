import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  OrdersServiceClient,
  ORDERS_SERVICE_NAME,
  ORDERS_PACKAGE_NAME,
  CreateOrdersRequest,
  UpdateOrdersRequest,
} from 'types/proto/orders';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  private orderService: OrdersServiceClient;
  constructor(@Inject(ORDERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.index({ orderId: id });
  }

  @Post()
  store(@Body() createOrderDto: CreateOrdersRequest) {
    return this.orderService.store(createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrdersRequest) {
    return this.orderService.update({ orderId: id, ...updateOrderDto });
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.orderService.destroy({ orderId: id });
  }
}
