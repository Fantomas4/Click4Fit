import { Component } from '@angular/core';
import {UserEntry} from './user-entry';
import {Router} from '@angular/router';
import {AuthenticationService} from './login/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    // any misspelled or non existing url/error that occurs, redirects to error-page
    this.router.errorHandler = (error: any) => {
      const routerError = error.toString();
      if (routerError.indexOf('Cannot match any routes') >= 0 ) {
        this.router.navigate(['/error-page']);
      } else {
        throw error;
      }
    };
  }
  // logoUrl = './assets/logo.png';
}
