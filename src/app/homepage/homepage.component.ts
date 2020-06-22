import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  logoUrl = '../assets/logo.png'; // Holds logos path
  privilegeLevel: string; // Store the user's privilege level (if a user is currently logged in).

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkPrivilegeLevel();
      }
    });
  }

  ngOnInit(): void {
    this.checkPrivilegeLevel();
  }

  checkPrivilegeLevel() {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.privilegeLevel = JSON.parse(sessionStorage.getItem('currentUser')).privilegeLevel;
    } else {
      this.privilegeLevel = undefined;
    }
  }
}
