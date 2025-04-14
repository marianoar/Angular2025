import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // }) // los inicializamos para el tipado

  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    //name: ['', Validadores sincronos[], validadores asincronos[] ]
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [, [Validators.required, Validators.min(10)],],
    inStorage: [0, [Validators.required, Validators.min(0)],]
  });

  isValidFile(fieldName: string): boolean | null {
    return (this.myForm.controls[fieldName].errors &&
            this.myForm.controls[fieldName].touched);
  }

  getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName])
      return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset(); // aca se pueden re setear los valores po default
  }
}
