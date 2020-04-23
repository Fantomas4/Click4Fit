import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: BusinessEntry[]; // Array containing the BusinessEntry objects that were retrieved from the database.

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    this.getResults();
  }

  /**
   * Called to fetch Business Entries results based on the keywords provided by
   * the user and the filters applied.
   */
  getResults() {
    this.searchService.getResults()
      .subscribe(results => this.searchResults = results);
  }

  /**
   * Called when the filters sidenav is toggled to update the
   * "Show/Hide Filters button text.
   */
  onToggleSidenav() {
    if (document.getElementById('filters-button').innerText === 'Show Filters') {
      document.getElementById('filters-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filters-button').innerText = 'Show Filters';
    }
  }
}
