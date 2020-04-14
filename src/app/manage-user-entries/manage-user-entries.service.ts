import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ENTRIES} from '../mock-database-for-users';
import {UserEntry} from '../user-entry';


@Injectable({
  providedIn: 'root'
})
export class ManageUserEntriesService {

  constructor() { }

  getResults(): Observable<UserEntry[]> {
    return of(ENTRIES);
  }
}

