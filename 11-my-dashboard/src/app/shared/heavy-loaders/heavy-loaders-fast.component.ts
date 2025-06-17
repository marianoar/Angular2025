import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  imports: [CommonModule],
  templateUrl: 'heavy-loaders-fast.component.html',
  // template: `<section [ngClass]="['w-full h-[600px]', cssClass]">
  //   <ng-content />
  // </section>`,
})
export class HeavyLoadersFastComponent {
  @Input({ required: true }) cssClass!: string;

  constructor() {
    console.log('heavy fast component');
  }
}
