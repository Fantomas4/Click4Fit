import { Injectable } from '@angular/core';
import { ENTRIES } from '../mock-database';
import {BusinessEntry} from '../business-entry';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
  }
}

