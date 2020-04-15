import { Injectable } from '@angular/core';
import {FAVORITESPlaces, FAVORITESWorkout} from '../mock-database';
import {FavoritesEntry1, FavoritesEntry2} from '../favorite-entry';
import {Observable, of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getFAVWResults(): Observable<FavoritesEntry1[]> {
    return of(FAVORITESWorkout);
  }

  getFAVPResults(): Observable<FavoritesEntry2[]> {
    return of(FAVORITESPlaces);
  }


}
