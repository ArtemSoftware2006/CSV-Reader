import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  providers : [{
    provide:  NG_VALUE_ACCESSOR,
    useExisting: TextInputComponent,
    multi: true
  }],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor{
  @Input() label!: string;
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() type = 'text';
  value! : string;

  constructor() {
  }
  onChange(_value? : string) {
    
  }
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn; 
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
