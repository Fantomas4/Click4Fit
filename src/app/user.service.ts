import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import {AlertService} from './core/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private alertService: AlertService) {
    console.log("USER SERVICE CONSTRUCTOR");
  }

  addFavoriteBusiness(request: object) {
    const result = this.http.post(`${environment.apiUrl}/add-favorite-business`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});

    // Update user data
    this.updateUserData();

    console.log("add");
    return result;
  }

  removeFavoriteBusiness(request: object) {
    const result = this.http.post(`${environment.apiUrl}/remove-favorite-business`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});

    // Update user data
    this.updateUserData();

    console.log("remove");
    return result;
  }

  addFavoriteWorkout(request: object) {
    const result = this.http.post(`${environment.apiUrl}/add-favorite-workout`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});

    // Update user data
    this.updateUserData();

    return result;
  }

  removeFavoriteWorkout(request: object) {
    const result = this.http.post(`${environment.apiUrl}/remove-favorite-workout`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});

    // Update user data
    this.updateUserData();

    return result;
  }

  /**
   * Called when a user adds or removes favorites from his preferences, in order to update
   * the local storage user data with the latest input from the Data Base.
   */
  updateUserData() {
    const request = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.http.post(`${environment.apiUrl}/display-myprofile`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).subscribe(

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
}
