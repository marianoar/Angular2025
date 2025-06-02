import { Component, inject, signal } from '@angular/core';
import { ProductTableComponent } from '../../../../products/components/product-table/product-table.component';
import { ProductService } from 'src/app/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '@products/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * 9,
        limit: request.limit,
      });
    },
  });
}
