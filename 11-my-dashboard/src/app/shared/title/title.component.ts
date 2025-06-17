import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `<h1 class="text-3xl mb-5">
    {{ title }} @if(withShadow){ - {{ withShadow }}}
  </h1>`,
})
export class TitleComponent {
  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
