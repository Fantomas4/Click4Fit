import { Injectable } from '@angular/core';
import { LEGSWORKOUTENTRIES,BACKWORKOUTENTRIES,
  CHESTWORKOUTENTRIES,SHOULDERSWORKOUTENTRIES,
  BICEPSWORKOUTENTRIES,TRICEPSWORKOUTENTRIES,
  ABSWORKOUTENTRIES,COREWORKOUTENTRIES} from '../mock-database';
import {LegsWorkoutEntry,BackWorkoutEntry,ChestWorkoutEntry,ShouldersWorkoutEntry,
  BicepsWorkoutEntry,TricepsWorkoutEntry,AbsWorkoutEntry,CoreWorkoutEntry} from '../workout-entry';
  import {Observable, of} from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';


/* This service is about getting workout entries from mock-database and displaying them */
@Injectable({
    providedIn: 'root'
  })
  export class WorkoutService {
  
    results;
    constructor(private http: HttpClient) { }
  
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
    postFilters(content): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const jsonData=JSON.stringify(content);
      return this.http.post('http://localhost:5000/api/workout',jsonData,{'headers':headers});  
    }
  }