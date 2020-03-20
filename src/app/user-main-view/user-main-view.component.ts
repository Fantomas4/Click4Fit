import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent implements OnInit {

  logoUrl = './assets/logo.png';
  clickedWorkout = false;
  clickedAbout = false;
  clickedSearch = false;
  clickedHome = false;
  clickedMyprofile = false;

  constructor(private router: Router) {}

  goToWorkout() {
    this.clickedWorkout = true;
  }
  goToSearch() {
    this.clickedSearch = true;
  }
  goToMyprofile() {
    this.clickedMyprofile = true;
  }
  goToAbout() {
    this.clickedAbout = true;
  }
  goToHome() {
    this.clickedHome = true;
  }

  ngOnInit(): void {
  }
}
