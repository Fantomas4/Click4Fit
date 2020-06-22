import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from './search.service';
import {BusinessEntry} from '../business-entry';
import {FormControl} from '@angular/forms';
import {LocationAutocompleteComponent} from './location-autocomplete/location-autocomplete.component';
import {AlertService} from '../core/alert.service';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../core/alert-message';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(LocationAutocompleteComponent) locationAutocomplete; // Used to access LocationAutocompleteComponent

  searchKeywords = new FormControl();

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  searchResults: BusinessEntry[];

  selectedOptions = [];
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
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
  }

  getResults() {
    this.searchResults = [];
    this.searchService.getResults({keywords: this.searchKeywords.value === null ? '' : this.searchKeywords.value,
      category: this.selectedOptions, country: this.locationAutocomplete.getUserCountryChoices(),
      city: this.locationAutocomplete.getUserCityChoices()}).subscribe(

    res => {
              this.searchResults = res.body.data;
              this.alertService.success('Found ' + res.body.data.length + ' results...');
            },

    error => {
              // If error is not a string received from the API, handle the ProgressEvent
              // returned due to the inability to connect to the API by printing an appropriate
              // warning message
              if (typeof(error) !== 'string') {
                this.alertService.error('Error: No connection to the API');
              } else {
                this.alertService.error(error);
              }
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
