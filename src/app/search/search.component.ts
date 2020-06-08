import {Component, OnInit,ViewChild} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
import {MatTableDataSource} from '@angular/material/table';
import {LocationAutocompleteComponent} from './location-autocomplete/location-autocomplete.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(LocationAutocompleteComponent) locationAutocomplete;

  searchResults: BusinessEntry[]; // Array containing the BusinessEntry objects that were retrieved from the database.
  searchInput: string;
  countryName: string;
  cityName: string;
  selectionArray = new Array();
  dataSource = new MatTableDataSource(this.searchResults);
  
  constructor(private searchService: SearchService) { }

  constructor(private searchService: SearchService, private alertService: AlertService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    // this.getResults();
  }

  getResults() {

    this.searchService.getResults({category: this.selectedOptions, country: this.locationAutocomplete.getUserCountryChoices(),
      city: this.locationAutocomplete.getUserCityChoices()}).subscribe(
        res => {
        this.searchResults = res.body.data;
    },

      error => {
        this.alertService.error(error);
    });

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
  onClick(){
    this.countryName=this.locationAutocomplete.location;
    console.log(this.countryName);
  }
}
