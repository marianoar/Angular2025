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
  myForm = this.fb.group({
    //name: ['', Validadores sincronos[], validadores asincronos[] ]
    name: ['', [Validators.required, Validators.minLength(3)],[]],
    price:[, [Validators.required, Validators.min(10)],],
    inStorage: [0, [Validators.required, Validators.min(0)],]
  });
}
