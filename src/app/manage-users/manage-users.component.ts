import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {UsersEntry} from '../users-entry';
import {ENTRIES} from '../mock-database-for-users';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersComponent {

  constructor() { }

  getResults(): Observable<UsersEntry[]> {
    return of(ENTRIES);
  }

}
