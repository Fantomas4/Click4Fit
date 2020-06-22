import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/** This service  is about sending request to API for addition of a favorite place*/
export class ResultCardService {


  constructor(private http: HttpClient) { }

  addFavoriteBusiness(request: object) {
    return this.http.post(`${environment.apiUrl}/add-favorite-business`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  removeFavoriteBusiness(request: object) {
    return this.http.post(`${environment.apiUrl}/remove-favorite-business`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }

  updateUser(request: object) {
    return this.http.post(`${environment.apiUrl}/display-myprofile`, JSON.stringify(request),
      {headers: {'Content-type': 'application/json'}, observe: 'response'});
  }
}
