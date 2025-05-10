import { Component, inject } from '@angular/core';
import { ProductService } from 'src/app/products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from 'src/app/products/components/product-card/product-card.component';
import { PaginationComponent } from '@products/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);

  activatedRoute = inject(ActivatedRoute);

  //tomo la ruta activa de forma dinamica
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );

  productsResource = rxResource({
    request: () => ({ page: this.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        // limit: 2,
        offset: request.page * 9,
        // gender: 'kids',
      });
    },
  });
}
