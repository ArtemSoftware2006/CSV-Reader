import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../input/text-input/text-input.component';
import { AutherizationService } from '../../../services/autherization/autherization.service';

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

  constructor(public authService : AutherizationService) {
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
      this.authService.login(this.loginForm.controls["login"].value, this.loginForm.controls["password"].value);
    }
    else{
      console.log("Form Invalid");
    }
  }
}
