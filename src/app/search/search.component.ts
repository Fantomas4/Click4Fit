import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
import {FormControl} from '@angular/forms';
import {LocationAutocompleteComponent} from './location-autocomplete/location-autocomplete.component';
import {AlertService} from '../core/alert.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(LocationAutocompleteComponent) locationAutocomplete; // Used to access LocationAutocompleteComponent

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

  constructor(private searchService: SearchService, private alertService: AlertService) { }

  ngOnInit(): void {
    // TEMP! FOR DEBUGGING ONLY!!!
    // this.getResults();
  }

  getResults() {

    this.searchService.getResults({category: this.selectedOptions, country: this.locationAutocomplete.getUserCountryChoices(),
      city: this.locationAutocomplete.getUserCityChoices()}).subscribe(res => {
        const results = res.body.data;
        console.log(results);
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

}
