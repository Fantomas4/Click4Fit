import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
import {FormControl} from '@angular/forms';
// import {MatPaginator} from '@angular/material/paginator';


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

  onToggleSidenav() {
    if (document.getElementById('filters-button').innerText === 'Show Filters') {
      document.getElementById('filters-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filters-button').innerText = 'Show Filters';
    }
  }

  applyFilter(event: Event) {
    // Get the filter value given by the user and apply it
    // to the dataSource data in order to filter them.
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      // Return to the first page if not already there.
      this.dataSource.paginator.firstPage();
    }
  }

  onSelection(e, v) {
    for (const a of v) {
      this.selectionArray.push(a.value);
    }
  }

}
