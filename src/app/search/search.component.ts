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
  countries: string[] = [];
  cities: string[] = [];


  constructor(private searchService: SearchService, private alertService: AlertService) { }

  ngOnInit(): void {
    // Called to ensure the local user data are in sync with the Data Base.
    this.updateUserData();

    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });

    // Load all available data from DB
    this.getResults();
  }

  updateUserData() {
    const request = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.searchService.updateUser(request).subscribe(

      data => {
        // @ts-ignore
        const {surname, favoriteWorkout, token, _id, name, email, privilegeLevel, favoriteBusiness} = data.body.user;
        const loggedInUserData = {
          _id,
          name,
          surname,
          email,
          privilegeLevel,
          token,
          favoriteBusiness,
          favoriteWorkout
        };

        sessionStorage.setItem('currentUser', JSON.stringify(loggedInUserData));

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

  getResults() {
    if (this.locationAutocomplete) {
      this.countries = this.locationAutocomplete.getUserCountryChoices();
      this.cities = this.locationAutocomplete.getUserCityChoices();
    }

    this.searchResults = [];
    this.searchService.getResults({keywords: this.searchKeywords.value === null ? '' : this.searchKeywords.value,
      category: this.selectedOptions, country: this.countries, city: this.cities}).subscribe(

    res => {
              this.searchResults = res.body.data;
              this.alertService.success('Found ' + res.body.data.length + ' results');
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
      // Sidenav closes, so we apply the filters and automatically fetch new results
      this.getResults();
    }
  }

}
