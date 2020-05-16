import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import {AuthenticationService} from '../login/authentication.service';

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent implements OnInit {

  logo = './assets/logo.png';

  privilegeLevel: string;
  screenWidth: number;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit(): void {
    this.privilegeLevel = JSON.parse(sessionStorage.getItem('currentUser')).privilegeLevel;

  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
