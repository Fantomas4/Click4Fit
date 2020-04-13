import { Injectable } from '@angular/core';
import { ENTRIES } from '../mock-database-for-users';
import {Observable, of} from 'rxjs';
import {UsersEntry} from '../users-entry';

@Injectable({
  providedIn: 'root'
})
export class SearchInUsersService {

  constructor() { }

  getResults1(): Observable<UsersEntry[]> {
    return of(ENTRIES);
  }
}



