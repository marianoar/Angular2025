import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-page/product-card/product-card.component';
import { ProductService } from 'src/app/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);

  productsResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.productService.getProducts();
    },
  });
}
