import { Injectable } from '@angular/core';
import {FAVORITEWORKOUT, FAVORITEPLACES} from '../mock-database';
import {FavoriteWorkout, FavoritePlace} from '../favorite-entry';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* This service is about getting favorites entries from mock-database and displaying them */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFAVWResults(): Observable<FavoriteWorkout[]> {
    return of(FAVORITEWORKOUT);
  }

  getFAVPResults(): Observable<FavoritePlace[]> {
    return of(FAVORITEPLACES);
  }
  getFavoriteWorkout():Observable<any>{
    return this.http.get('http://localhost:5000/api/favorite-workout');
  }
  getFavoritePlaces():Observable<any>{
    return this.http.get('http://localhost:5000/api/favorite-places');
  }

}