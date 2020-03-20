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
    this.router.navigate(['workout']);
    this.clickedWorkout = true;
  }
  goToSearch() {
    this.router.navigate(['search']);
    this.clickedSearch = true;
  }
  goToMyprofile() {
    this.router.navigate(['myprofile']);
    this.clickedMyprofile = true;
  }
  goToAbout() {
    this.router.navigate(['about']);
    this.clickedAbout = true;
  }
  goToHome() {
    this.router.navigate(['home']);
    this.clickedHome = true;
  }

  ngOnInit(): void {
  }
}
