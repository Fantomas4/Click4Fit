import { Injectable } from '@angular/core';
import {FAVORITEWORKOUT, FAVORITEPLACES} from '../mock-database';
import {FavoriteWorkout, FavoritePlace} from '../favorite-entry';
import {Observable, of} from 'rxjs';



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