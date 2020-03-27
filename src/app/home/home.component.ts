import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  picture1='./assets/picture1.jpg';
  picture2='./assets/picture2.jpg';
  picture3='./assets/picture3.jpg';
  height:number;
  width:number;
  
  constructor(config:NgbCarouselConfig) { 
    config.interval=2100;
    config.wrap=true;
    config.keyboard=false;
    config.pauseOnHover=true;
    config.showNavigationArrows=false;
    config.showNavigationIndicators=true;
    this.height=screen.height-192;
    this.width=screen.width;
  }

  ngOnInit(): void {
  }
  getWidth(){
      return this.width;
  }
  getHeight(){
    return this.height;
  }

}
