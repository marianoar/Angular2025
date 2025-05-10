import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from 'src/app/products/components/product-card/product-card.component';
import { PaginationComponent } from '@products/components/pagination/pagination.component';
import { PaginationService } from '@products/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  //podria hacerse algo asi tambien
  // currentPage = toSignal(
  //   ()=>inject(PaginationService).currentPage()
  // )
  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        // limit: 2,
        offset: request.page * 9,
        // gender: 'kids',
      });
    },
  });
}
