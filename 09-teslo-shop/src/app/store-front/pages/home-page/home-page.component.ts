import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from 'src/app/products/components/product-card/product-card.component';

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
      return this.productService.getProducts({
        // limit: 2,
        // offset: 0,
        // gender: 'kids',
      });
    },
  });
}
