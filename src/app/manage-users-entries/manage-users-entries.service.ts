import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ENTRIES} from '../mock-database-for-users';
import {UsersEntry} from '../users-entry';


@Injectable({
  providedIn: 'root'
})
export class ManageUsersEntriesService {

  constructor() { }

  getResults1(): Observable<UsersEntry[]> {
    return of(ENTRIES);
  }
}

