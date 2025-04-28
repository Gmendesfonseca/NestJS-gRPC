import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [],
    }).compile();
  });

  describe('getOrders', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<OrdersController>(OrdersController);
      const mockRequest = { orderId: 123 };
      expect(appController.index(mockRequest)).toEqual({
        orderId: 0,
        productIds: [],
        totalPrice: 0,
        status: 'NOT_FOUND',
      });
    });
  });
});
