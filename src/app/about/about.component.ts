import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'About us';
  videoUrl1 = 'https://www.youtube.com/embed/BHY0FxzoKZE';
  videoUrl2 = 'https://www.youtube.com/embed/LkXwfTsqQgQ';

  trustedVideoResource1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl1);
  trustedVideoResource2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl2);


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {}

}
