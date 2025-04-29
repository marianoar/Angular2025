import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-page/product-card/product-card.component";


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
