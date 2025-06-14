import {
  Component,
  inject,
  Inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from 'src/app/products/interfaces/product-response.interface';
import { ProductCarouselComponent } from '../../../../../products/components/product-carousel/product-carousel.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '@utils/forms-utils';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { ProductService } from 'src/app/products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [
    ReactiveFormsModule,
    ProductCarouselComponent,
    FormErrorLabelComponent,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  router = inject(Router);
  product = input.required<Product>();
  productService = inject(ProductService);

  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  wasSaved = signal(false);

  productForm: FormGroup = this.fb.group({
    title: [undefined, Validators.required],
    slug: [
      undefined,
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    description: [undefined, Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [undefined, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product()); //asi lo deja Pristine al form
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSizeChange(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    console.log(size);
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    // console.log(this.productForm.value);
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;
    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag: string) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      //recibe Observable and return Promise
      const product = await firstValueFrom(
        this.productService.createProduct(productLike)
      );
      this.router.navigate(['/admin/products', product.id]);
    } else {
      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike)
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 2500);
  }
}
