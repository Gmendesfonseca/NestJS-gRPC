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
  PRODUCTS_SERVICE_NAME,
  PRODUCTS_PACKAGE_NAME,
  ProductsServiceClient,
  CreateProductsRequest,
} from 'types/proto/products';

@Controller('products')
export class ProductController implements OnModuleInit {
  private productService: ProductsServiceClient;
  constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.index({ productId: id });
  }

  @Post()
  create(@Body() product: CreateProductsRequest) {
    return this.productService.store(product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product: CreateProductsRequest) {
    return this.productService.update({ productId: id, ...product });
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.productService.destroy({ productId: id });
  }
}
