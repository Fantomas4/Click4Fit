import { Injectable } from '@angular/core';
import {FAVORITEWORKOUT, FAVORITEPLACES} from '../mock-database';
import {FavoriteWorkout, FavoritePlace} from '../favorite-entry';
import {Observable, of} from 'rxjs';

/* This service is about getting favorites entries from mock-database and displaying them */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getFAVWResults(): Observable<FavoriteWorkout[]> {
    return of(FAVORITEWORKOUT);
  }

  getFAVPResults(): Observable<FavoritePlace[]> {
    return of(FAVORITEPLACES);
  }


}