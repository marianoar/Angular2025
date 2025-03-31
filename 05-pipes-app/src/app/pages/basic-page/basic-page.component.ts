import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, Pipe, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

  localeService = inject(LocaleService);
   currentLocale = signal(inject(LOCALE_ID)); //se podria hacer del servicio directamente

  nameLower = signal('mariano');
  nameUpper = signal('MARIANO');
  fullName = signal('marianO AR');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000);
    onCleanup(() => {
      clearInterval(interval);
    })
  })

  changeLocale(locale: AvailableLocale) {
    this.localeService.changeLocal(locale);
  }
}
