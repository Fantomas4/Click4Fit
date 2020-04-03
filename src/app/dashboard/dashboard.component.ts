import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  image1Url = './assets/calendar.jpg';
  image2Url = './assets/heart.jpg';
  constructor() {
  }
  today: number = Date.now();

  ngOnInit(): void {
  }

}
