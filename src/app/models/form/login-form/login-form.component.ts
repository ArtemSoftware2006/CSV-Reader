import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../input/text-input/text-input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  providers: []
})
export class LoginFormComponent {
  loginForm : FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      login : new FormControl('', [
        Validators.required,
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      console.log(this.loginForm.controls['login'].value);
      console.log(this.loginForm.controls['password'].value);
    }
    console.log("Form Invalid");
  }
}
