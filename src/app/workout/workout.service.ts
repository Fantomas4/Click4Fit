import { Injectable } from '@angular/core';
import { WORKOUTENTRIES } from '../mock-database';
import {WorkoutEntry} from '../workout-entry';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {
  
    constructor() { }
  
    getResults(): Observable<WorkoutEntry[]> {
      return of(WORKOUTENTRIES);
    }
  }