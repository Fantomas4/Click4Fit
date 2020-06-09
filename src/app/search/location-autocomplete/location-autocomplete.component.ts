import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LocationAutocompleteService} from './location-autocomplete.service';
import {AlertService} from '../../core/alert.service';

/**
 * @title Filter autocomplete
 */

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.css']
})
export class LocationAutocompleteComponent implements OnInit {
  countryFormControl: FormControl = new FormControl();
  cityFormControl: FormControl = new FormControl();


  countryOptions: string[];
  cityOptions: string[];

  filteredCountryOptions: Observable<string[]>;
  filteredCityOptions: Observable<string[]>;


  constructor(private locationService: LocationAutocompleteService, private alertService: AlertService) {}

  ngOnInit() {
    this.filteredCountryOptions = this.countryFormControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.filterCountries(val) : [])
      );

    this.filteredCityOptions = this.cityFormControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.filterCities(val) : [])
      );

    this.getCountries();
    this.getCities();
  }

  getCountries() {
    this.locationService.getCountries().subscribe(res => {
        this.countryOptions = res.body.data;
      },

      error => {
        this.alertService.error(error);
      });
  }

  getCities() {
    this.locationService.getCities().subscribe(res => {
        this.cityOptions = res.body.data;
      },

      error => {
        this.alertService.error(error);
      });
  }

  filterCountries(val: string): string[] {
    return this.countryOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterCities(val: string): string[] {
    return this.cityOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  getUserCountryChoices() {
    return this.countryFormControl.value ? [this.countryFormControl.value] : [];
  }

  getUserCityChoices() {
    return this.cityFormControl.value ? [this.cityFormControl.value] : [];
  }
}
