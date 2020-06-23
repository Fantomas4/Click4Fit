import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ResultCard2Service {


  constructor(private http: HttpClient) { }

  addFavoriteWorkout(request: object) {
    return this.http.post(`${environment.apiUrl}/add-favorite-workout`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  removeFavoriteWorkout(request: object) {
    return this.http.post(`${environment.apiUrl}/remove-favorite-workout`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  updateUser(request: object) {
    return this.http.post(`${environment.apiUrl}/display-myprofile`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }
}
