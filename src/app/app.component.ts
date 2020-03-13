import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Click4Fit';
  logoUrl="./assets/logo.JPG";
  imageUrl="./assets/fitness.jpg"
  clickedWorkout=false;
  clickedAbout=false;
  clickedSearch=false;
  clickedHome=false;
  clickedMyprofile=false;

  constructor(private router:Router){}
  
  goToWorkout(){
    this.router.navigate(['workout']);
    this.clickedWorkout=true;
  }
  goToSearch(){
    this.router.navigate(['search']);
    this.clickedSearch=true;
  }
  goToMyprofile(){
    this.router.navigate(['myprofile']);
    this.clickedMyprofile=true;
  }
  goToAbout(){
    this.router.navigate(['about']);
    this.clickedAbout=true;
  }
  goToHome(){
    this.router.navigate(['home']);
    this.clickedHome=true;
  }
}


