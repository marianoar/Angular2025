import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent {


  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  
  myForm: FormGroup = this.fb.group(
    {
      gender:[undefined, Validators.required],
      notifications: [true],
      termsAndConditions:[false, Validators.requiredTrue]
    }
  )

  onSubmit() {
    this.myForm.markAllAsTouched();
    }
}
