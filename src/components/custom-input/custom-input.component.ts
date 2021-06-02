import { Component, OnInit, Input} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CustomInputComponent}]
})
export class CustomInputComponent {
  @Input() public label;
  @Input() public type = 'text';
  @Input() control: AbstractControl;
  @Input() enablePasswordChecking = false;
  public showPassword(): void{
    this.type = 'text';
    setTimeout(() => this.type = 'password', 2500);
  }

  public get getValue(): string{
    this.control.markAllAsTouched();
    return this.control.value;
  }
}
