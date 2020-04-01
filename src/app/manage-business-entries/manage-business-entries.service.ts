import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {BusinessEntry} from '../business-entry';
import {ENTRIES} from '../mock-database';

@Injectable({
  providedIn: 'root'
})
export class ManageBusinessEntriesService {

  constructor() { }

  getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
  }

}
