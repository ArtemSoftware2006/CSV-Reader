import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      login : new FormControl(''),
      password : new FormControl(''),
      text : new FormControl('')
    });

    this.loginForm.get('login') as FormControl;
  }

  onSubmit() {
    console.log(this.loginForm.controls['login'].value)
    console.log(this.loginForm.controls['password'].value)
  }
}
