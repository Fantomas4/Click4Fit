import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent implements OnInit {

  logo = './assets/logo.png';

  isAdmin = false;
  isClient = true;
  screenWidth:number;

  constructor(private router: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit(): void {
  }

}
