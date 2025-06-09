import { Component, Inject, input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/interfaces/product-response.interface';
import { ProductCarouselComponent } from '../../../../../products/components/product-carousel/product-carousel.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '@utils/forms-utils';

@Component({
  selector: 'product-details',
  imports: [ReactiveFormsModule, ProductCarouselComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  private fb = Inject(FormBuilder);
  // productForm: FormGroup = this.fb.group({
  // title: ['', Validators.required],
  // description: ['', Validators.required],
  // slug: [
  //   '',
  //   [Validators.required, Validators.pattern(FormUtils.slugPattern)],
  // ],
  // price: [0, [Validators.required, Validators.min(0)]],
  // stock: ['', [Validators.required, Validators.min(0)]],
  // sizes: [['']],
  // images: [[]],
  // tags: [''],
  // gender: [
  //   'men',
  //   [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
  // ],
  //});
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  ngOnInit(): void {
    // this.setFormValue(this.product());
  }
  // setFormValue(formLike: Partial<Product>) {
  //   this.productForm.reset(this.product() as any);
  //   this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  // }
  onSubmit() {
    // this.productForm.value;
  }
}
