import { Component } from '@angular/core';
import { LoginFormComponent } from '../../models/form/login-form/login-form.component';
import { RegistrationFormComponent } from '../../models/form/registration-form/registration-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, RegistrationFormComponent, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  isLoginMode: boolean = true;
  changeModeText = 'To registration'
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.changeModeText = 'To registration';
    }
    else {
      this.changeModeText = "To login";
    }
  }
}
