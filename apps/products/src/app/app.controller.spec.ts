import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [],
    }).compile();
  });

  describe('index', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<ProductsController>(ProductsController);
      const mockRequest = { productId: 1 };
      expect(appController.index(mockRequest)).toEqual({
        name: '',
        price: 0,
        productId: 0,
      });
    });
  });
});
