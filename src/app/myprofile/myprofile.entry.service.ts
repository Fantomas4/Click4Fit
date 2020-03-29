import { Injectable } from '@angular/core';
import { PROFILEENTRIES } from '../mock-database';
import {MyProfileEntry} from '../myprofile-entry';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MyProfileEntryService {
  
    constructor() { }
  
    getResults(): Observable<MyProfileEntry[]> {
      return of(PROFILEENTRIES);
    }
  }