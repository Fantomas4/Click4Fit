import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: BusinessEntry[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    this.getResults();
  }

  getResults() {
    this.searchService.getResults()
      .subscribe(results => this.searchResults = results);
   }

}
