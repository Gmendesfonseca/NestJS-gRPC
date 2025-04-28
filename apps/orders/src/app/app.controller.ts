import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  OrdersRequest,
  OrdersResponse,
  CreateOrdersRequest,
  OrdersServiceController,
  OrdersServiceControllerMethods,
  DestroyOrdersResponse,
  UpdateOrdersRequest,
} from 'types/proto/orders';

@Controller('orders')
@OrdersServiceControllerMethods()
export class OrdersController implements OrdersServiceController {
  private orders: OrdersResponse[] = [];

  index(
    request: OrdersRequest,
  ): Promise<OrdersResponse> | Observable<OrdersResponse> | OrdersResponse {
    return (
      this.orders.find((order) => order.orderId === request.orderId) || {
        orderId: 0,
        productIds: [],
        totalPrice: 0,
        status: 'NOT_FOUND',
      }
    );
  }

  store(
    request: CreateOrdersRequest,
  ): Promise<OrdersResponse> | Observable<OrdersResponse> | OrdersResponse {
    const id = this.orders.length + 1;
    this.orders.push({
      orderId: id,
      productIds: request.productIds,
      totalPrice: request.totalPrice,
      status: 'CREATED',
    });
    return this.orders[id - 1];
  }

  update(
    request: UpdateOrdersRequest,
  ): Promise<OrdersResponse> | Observable<OrdersResponse> | OrdersResponse {
    const index = this.orders.findIndex(
      (order) => order.orderId === request.orderId,
    );
    if (index !== -1) {
      this.orders[index] = {
        ...this.orders[index],
        productIds: request.productIds,
        totalPrice: request.totalPrice,
        status: 'UPDATED',
      };
      return this.orders[index];
    }
    return {
      orderId: 0,
      productIds: [],
      totalPrice: 0,
      status: 'NOT_FOUND',
    };
  }

  destroy(
    request: OrdersRequest,
  ):
    | Promise<DestroyOrdersResponse>
    | Observable<DestroyOrdersResponse>
    | DestroyOrdersResponse {
    const index = this.orders.findIndex(
      (order) => order.orderId === request.orderId,
    );
    if (index !== -1) {
      this.orders.splice(index, 1);
      return { message: 'Order deleted successfully' };
    }
    return { message: 'Order not found' };
  }
}
