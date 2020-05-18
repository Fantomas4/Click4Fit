import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserEntry} from '../user-entry';
import {AlertService} from '../core/alert.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserEntry>;
  public currentUser: Observable<UserEntry>;

  constructor(private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<UserEntry>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserEntry {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
    //   .pipe(map(user => {
    //     // login successful if there's a jwt token in the response
    //     if (user && user.token) {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //
    //     return user;
    //   }));


    const user: UserEntry = {
      id: 1,
      name: 'Giorgos',
      lastname: 'Papadopoulos',
      email: 'giorgospapad@gmail.com',
      password: 'gp123456',
      birthdate: '04,16,1997',
      privilegeLevel: 'admin',
      token: 'd2d232d22d2'};

    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    // console.log('sdadsaadasd');
    // this.alertService.error('Error: Could not authenticate user');
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
