import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserStore } from '../stores/user.store';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  /**
   * very simple form here in order to help us manipulate values later and play with observables
   */
  public userForm: FormGroup = this._formBuilder.group({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, Validators.required),
  });

  /**
   * 
   * @param _formBuilder 
   * @param _userStore we use DI here to refer the the same UserStore class throughout the app and manipulate the same user object in different components
   */
  constructor(private _formBuilder: FormBuilder, private _userStore: UserStore) {}

  /**
   * this will react to form submission and update the value of the user stored in the app.
   * the different places where we have subscribed to our user value to react accordingly
   */
  public submitForm(): void {
    if(this.userForm.valid) {
      this.userForm.disable();
      this._userStore.setUser(this.userForm.value);
    }
    this.userForm.enable();
  }

}
