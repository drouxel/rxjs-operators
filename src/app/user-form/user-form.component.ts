import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  public userForm: FormGroup = this._formBuilder.group({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, Validators.required),
  });

  constructor(private _formBuilder: FormBuilder) {}

  public submitForm(): void {
    if(this.userForm.valid) {
      this.userForm.disable();
      window.alert(`nom: ${this.userForm.controls['name']?.value}, prénom: ${this.userForm.controls['surname']?.value}, date de naissance: ${(this.userForm.controls['birthDate']?.value as Date)?.toISOString()}`);
    }
    this.userForm.enable();
  }

}
