import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {USERENTRIES} from '../mock-database';
import {UserEntry} from '../user-entry';


@Injectable({
  providedIn: 'root'
})
export class ManageUserEntriesService {

  constructor() { }

  getResults(): Observable<UserEntry[]> {
    return of(USERENTRIES);
  }
}

