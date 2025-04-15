import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils=FormUtils;
  errorFormGral: boolean = false;
  
  myForm: FormGroup = this.fb.group(
    {
      name:['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array(
        [
          ['Prince of Persia', [Validators.required]],
          ['PacMan', [Validators.required]]
        ],
        Validators.minLength(3)
      )
    }
  );

  newFavoriteGame= new FormControl('', Validators.required);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray ; // es un get propio del FormGroup
  }

  onAddToFavorites() {
    if(this.newFavoriteGame.invalid)
      return;
    const newGame = this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavoriteGame.reset();
  }
  onDeleteFavorite(i: number) {
    console.log(i);
     this.favoriteGames.removeAt(i);
    }

onSubmit(){
  this.myForm.markAllAsTouched();
  if(this.myForm.invalid)
    this.errorFormGral=true;
}
}
