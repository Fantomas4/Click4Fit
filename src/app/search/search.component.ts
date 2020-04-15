import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
// import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  searchResults: BusinessEntry[];

  filtersButtonClicked = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    this.getResults();
  }

  getResults() {
    this.searchService.getResults()
      .subscribe(results => this.searchResults = results);
   }

   onFiltersButtonClick() {
      if (!this.filtersButtonClicked) {
        document.getElementById('filters-button').innerText = 'Hide Filters';
        this.filtersButtonClicked = true;
      } else {
        document.getElementById('filters-button').innerText = 'Show Filters';
      }
   }

}
