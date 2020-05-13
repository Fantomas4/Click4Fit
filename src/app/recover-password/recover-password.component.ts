import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {RecoverPasswordService} from './recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoveryEmail: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public recoverPasswordService: RecoverPasswordService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  onClick() {
    this.recoverPasswordService.openModal();
  }
}
