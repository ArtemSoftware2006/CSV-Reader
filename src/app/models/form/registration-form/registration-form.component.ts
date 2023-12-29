import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  registrationForm : FormGroup

  constructor() {
    this.registrationForm = new FormGroup({
      login : new FormControl('', [
        Validators.required,
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
      passwordConfirm : new FormControl('',[
        Validators.required,
        this.passwordMatchValidator
      ]),
    });
  }

  passwordMatchValidator(form: FormGroup) : ValidationErrors | null {
    const password = form.root.get('password')?.value;
    const confirmPassword = form.root.get('passwordConfirm')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
