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

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    this.getResults();
  }

  getResults() {
    this.searchService.getResults()
      .subscribe(results => this.searchResults = results);
  }

  onToggleSidenav() {
    if (document.getElementById('filters-button').innerText === 'Show Filters') {
      document.getElementById('filters-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filters-button').innerText = 'Show Filters';
    }
  }
}
