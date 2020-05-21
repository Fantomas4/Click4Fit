import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  myControl = new FormControl();
  searchResults: BusinessEntry[];

  selectedOptions: string[];
  businessCategories: {
    name: string;
    value: string;
  }[] = [
    {
      name: 'Gym',
      value: 'gym'
    },
    {
      name: 'Personal Trainer',
      value: 'personal trainer'
    },
    {
      name: 'Fitness Shop',
      value: 'fitness shop'
    },
  ];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    // this.getResults();
  }

  getResults() {

    this.searchService.getResults(this.selectedOptions);
    // this.searchService.getResults()
    //   .subscribe(results => this.searchResults = results);
  }

  onToggleSidenav() {
    if (document.getElementById('filters-button').innerText === 'Show Filters') {
      document.getElementById('filters-button').innerText = 'Hide Filters';
    } else {
      document.getElementById('filters-button').innerText = 'Show Filters';
    }
  }

}
