import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Holding current year
  currentYear: number;

  // Holding paths for social media icons
  facebookUrl = "./assets/facebook.png";
  instagramUrl = "./assets/instagram.png";
  twitterUrl = "./assets/twitter.png";
  youtubeUrl = "./assets/youtube.png";

  constructor() { }

  ngOnInit(): void {
    // Initialize currentYear field
    this.currentYear = new Date().getFullYear();
  }

}
