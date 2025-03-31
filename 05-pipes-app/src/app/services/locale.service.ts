import { Injectable, signal } from "@angular/core";

export type AvailableLocale = 'es' | 'fr' | 'en';

@Injectable({ providedIn: 'root' })
export class LocaleService {

    constructor() {
        this.currentLocale.set((localStorage.getItem('locale') as AvailableLocale) ?? 'es');
    }

    private currentLocale = signal<AvailableLocale>('es');

    get getLocale() {
        return this.currentLocale();
    }

    changeLocal(locale: AvailableLocale) {
        localStorage.setItem('locale', locale);
        this.currentLocale.set(locale);
        window.location.reload() // tengo que refrescar la pantalla pues no es un cambio reactivo
    }
}