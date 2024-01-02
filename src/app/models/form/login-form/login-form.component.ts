import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../input/text-input/text-input.component';
import { AutherizationService } from '../../../services/autherization/autherization.service';
import { Router } from '@angular/router';

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

  constructor(public authService : AutherizationService,
    public router: Router) {
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
       this.authService.login(this.loginForm.controls["login"].value, 
                            this.loginForm.controls["password"].value)
      .then(result => {
          if (result) {
            this.router.navigate(['/csv-panel']);
          }
          else {
            alert("Wrong login or password");
          }
      })
      .catch(err => alert(err));
    }
    else{
      console.log("Form Invalid");
    }
  }
}
