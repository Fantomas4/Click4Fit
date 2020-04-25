import { Injectable } from '@angular/core';
import { LEGSWORKOUTENTRIES,BACKWORKOUTENTRIES,
  CHESTWORKOUTENTRIES,SHOULDERSWORKOUTENTRIES,
  BICEPSWORKOUTENTRIES,TRICEPSWORKOUTENTRIES,
  ABSWORKOUTENTRIES,COREWORKOUTENTRIES} from '../mock-database';
import {LegsWorkoutEntry,BackWorkoutEntry,ChestWorkoutEntry,ShouldersWorkoutEntry,
  BicepsWorkoutEntry,TricepsWorkoutEntry,AbsWorkoutEntry,CoreWorkoutEntry} from '../workout-entry';
import {Observable, of} from 'rxjs';


/* This service is about getting workout entries from mock-database and displaying them */
@Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {
  
    constructor() { }
  
    getLegsResults(): Observable<LegsWorkoutEntry[]> {
      return of(LEGSWORKOUTENTRIES);
    }
    getBackResults(): Observable<BackWorkoutEntry[]> {
      return of(BACKWORKOUTENTRIES);
    }
    getChestResults(): Observable<ChestWorkoutEntry[]> {
      return of(CHESTWORKOUTENTRIES);
    }
    getShouldersResults(): Observable<ShouldersWorkoutEntry[]> {
      return of(SHOULDERSWORKOUTENTRIES);
    }
    getBicepsResults(): Observable<BicepsWorkoutEntry[]> {
      return of(BICEPSWORKOUTENTRIES);
    }
    getTricepsResults(): Observable<TricepsWorkoutEntry[]> {
      return of(TRICEPSWORKOUTENTRIES);
    }
    getAbsResults(): Observable<AbsWorkoutEntry[]> {
      return of(ABSWORKOUTENTRIES);
    }
    getCoreResults(): Observable<CoreWorkoutEntry[]> {
      return of(COREWORKOUTENTRIES);
    }
  }