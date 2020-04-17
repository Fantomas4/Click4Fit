import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  logoUrl = '../assets/logo.png';

  screenWidth: number;

  // constructor(private router: Router) {
  //   this.screenWidth = window.innerWidth;
  //   window.onresize = () => {
  //     this.screenWidth = window.innerWidth;
  //   };
  // }
  constructor(private router: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  checkWidth(){
    if (this.screenWidth<=425){
      return true;
    }
    else{
      return false;
    }
  }


  ngOnInit(): void {
  }

}
