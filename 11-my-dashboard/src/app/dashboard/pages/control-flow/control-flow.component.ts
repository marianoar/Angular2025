import { Component, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';

type Grade = 'A' | 'B' | 'C';

@Component({
  selector: 'app-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {
  public showcontent = signal(false);
  public grade = signal<Grade>('A');
  public frameworks = signal(['Angular', 'Vue', 'Svelte']);
  public frameworks2 = signal([]);

  toggleContent() {
    this.showcontent.update((v) => !v);
    this.grade.set('B');
  }
}
