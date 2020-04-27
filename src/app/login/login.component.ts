import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';

  message: string;

  inputError = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {


  }

  onSubmit(): void {
    console.log(this.username);
    console.log(this.password);
    // if (this.username === 'admin' && this.password === 'admin') {
    //   this.router.navigate(['user']);
    // } else {
    //   this.message = 'Invalid credentials';
    // }
    console.log(this.username.length);
    console.log(this.password.length);
    if (this.username !== '' && this.password !== '') {
      this.authenticationService.login(this.username, this.password);
    } else {
      this.inputError = true;
    }
    console.log('inputError: ' + this.inputError);
  }
}

