import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductResponse,
} from '../interfaces/product-response.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    // falta validar duration de la cache
    //ver TanstackQuery
    // console.log(this.productsCache.entries());
    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        // tap((resp) => console.log({ resp })),
        tap((resp) => this.productsCache.set(key, resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      // delay(1500),
      tap((product) => this.productCache.set(idSlug, product))
    );
  }

  getProductById(id: string): Observable<Product> {
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      // delay(1500),
      tap((product) => this.productCache.set(id, product))
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product> {
    console.log('update');
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(
        tap((p) => this.updateProductCache(p))
      );
  }

  updateProductCache(product: Product) {
    const productId = product.id;
    this.productCache.set(product.id, product);
    this.productsCache.forEach((p) => {
      p.products = p.products.map((currentProduct) => {
        return currentProduct.id === productId ? product : currentProduct;
      });
    });
      console.log("cache updated");
  }
}
