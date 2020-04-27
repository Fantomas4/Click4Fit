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
  // currentUser: UserEntry;
  //
  // constructor(private router: Router, private authenticationService: AuthenticationService) {
  //   this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  // }
}
