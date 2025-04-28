import { Controller, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateProductsRequest,
  DestroyProductsResponse,
  ProductsRequest,
  ProductsResponse,
  ProductsServiceController,
  ProductsServiceControllerMethods,
  UpdateProductsRequest,
} from 'types/proto/products';

@Controller('products')
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
  private products: ProductsResponse[] = [];
  private readonly logger = new Logger(ProductsController.name);

  index(
    request: ProductsRequest,
  ):
    | Promise<ProductsResponse>
    | Observable<ProductsResponse>
    | ProductsResponse {
    this.logger.debug('ProductsController.index: called');
    return (
      this.products.find(
        (product) => product.productId === request.productId,
      ) || {
        productId: 0,
        name: '',
        price: 0,
      }
    );
  }

  store(
    request: CreateProductsRequest,
  ):
    | Promise<ProductsResponse>
    | Observable<ProductsResponse>
    | ProductsResponse {
    this.logger.debug('ProductsController.store: called');
    const id = this.products.length + 1;
    this.products.push({
      productId: id,
      name: request.name,
      price: request.price,
    });
    return this.products[id - 1];
  }

  update(
    request: UpdateProductsRequest,
  ):
    | Promise<ProductsResponse>
    | Observable<ProductsResponse>
    | ProductsResponse {
    this.logger.debug('ProductsController.update: called');
    const index = this.products.findIndex(
      (product) => product.productId === request.productId,
    );
    if (index !== -1) {
      this.products[index].name = request.name;
      this.products[index].price = request.price;
      return this.products[index];
    }
    return {
      productId: 0,
      name: '',
      price: 0,
    };
  }

  destroy(
    request: ProductsRequest,
  ):
    | Promise<DestroyProductsResponse>
    | Observable<DestroyProductsResponse>
    | DestroyProductsResponse {
    this.logger.debug('ProductsController.destroy: called');
    const index = this.products.findIndex(
      (product) => product.productId === request.productId,
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      return { message: 'Product deleted successfully' };
    } else {
      return { message: 'Product not found' };
    }
  }
}
