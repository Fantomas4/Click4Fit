import { Injectable } from '@angular/core';
import {FavoriteWorkout, FavoritePlace} from '../favorite-entry';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* This service is about getting favorites entries  and displaying them */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFavoriteWorkout(user):Observable<any>{
    const headers = {'content-type':'application/json'};
    const jsonData=JSON.stringify(user);
    return this.http.post('http://localhost:5000/api/favorite-workout',jsonData,{'headers':headers});
  }
  getFavoritePlaces(user):Observable<any>{
    const headers = {'content-type':'application/json'};
    const jsonData=JSON.stringify(user);
    return this.http.post('http://localhost:5000/api/favorite-places',jsonData,{'headers':headers});
  }

}
