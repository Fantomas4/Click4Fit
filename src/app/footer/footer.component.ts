import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();

  facebookUrl = "./assets/facebook.png";
  instagramUrl = "./assets/instagram.png";
  twitterUrl = "./assets/twitter.png";
  youtubeUrl = "./assets/youtube.png";

  constructor() { }

  ngOnInit(): void {
  }

}
