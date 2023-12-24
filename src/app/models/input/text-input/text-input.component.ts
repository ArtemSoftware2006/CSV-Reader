import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  constructor() {
   this.label="";
   this.id="";
   this.formControl=new FormControl();
   this.placeholder="";
   this.formControlName="";
  }
}
