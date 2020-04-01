import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent implements OnInit {

  logoUrl = './assets/logo.png';

  isAdmin = true;
  isClient = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
