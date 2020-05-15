import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserEntry} from '../user-entry';
import {AlertService} from '../core/alert.service';
import {environment} from '../../environments/environment';
import {LoggedInUser} from './logged-in-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoggedInUser>;
  public currentUser: Observable<LoggedInUser>;

  constructor(private alertService: AlertService, private http: HttpClient) {
    // console.log(sessionStorage.getItem('currentUser'));
    console.log('session storage: ', JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

    // nikosalex@gmail.com
    // gp123456
    // DEBUGGING ONLY!!!!!!
    email = 'nikosalex@gmail.com';
    password = 'gp123456';

    // return this.http.post(`${environment.apiUrl}/login`, JSON.stringify({email, password}),
    //     {headers: {'Content-type': 'application/json'}, observe: 'response'}).subscribe((res: any) => {
    //       console.log('res: ', res);
    //       console.log('https status: ', res.status);
    //       console.log('http data: ', res.data);
    //       console.log('http error: ', res.error);
    //
    //       if (res.status === 200) {
    //         if (res.user && res.user.token) {
    //           // const loggedInUser: LoggedInUser = {
    //           //   firstName: res.user.name,
    //           //   lastName: res.user.surname,
    //           //   email: res.user.email,
    //           //   privilegeLevel: res.user.privilegeLevel,
    //           //   token: res.user.token
    //           // };
    //           console.log('inside http post');
    //           console.log(res.user);
    //
    //           sessionStorage.setItem('currentUser', JSON.stringify(res.user));
    //           this.currentUserSubject.next(res.user);
    //         }
    //         // The user has been successfully validated by the database,
    //         // so true is returned
    //         return true;
    //       } else {
    //         // An error occurred during the user's validation by the database,
    //         // so false is returned and an error message is displayed using
    //         // alert service
    //         this.alertService.error('Error: Could not authenticate user');
    //         return false;
    //       }
    // });


    return this.http.post<any>(`${environment.apiUrl}/login`, JSON.stringify({email, password}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
            console.log('RECEIVED 1: ', res);
            if (res.status === 200) {
              // console.log('RECEIVED 2');
              // console.log('RECEIVED 2 - res.user: ', res.user);
              // console.log('RECEIVED 2 - res.user.token: ', res.user.token);
              const data = res.body;
              if (data.user && data.user.token) {
                console.log('RECEIVED 3');
                // const loggedInUser: LoggedInUser = {
                //   firstName: res.user.name,
                //   lastName: res.user.surname,
                //   email: res.user.email,
                //   privilegeLevel: res.user.privilegeLevel,
                //   token: res.user.token
                // };

                sessionStorage.setItem('currentUser', JSON.stringify(data.user));
                this.currentUserSubject.next(data.user);
                console.log('CHECK! currentUserSubject: ', this.currentUserSubject);
              }
            }
            console.log('RETURNING FROM login()....');
            return res;
    }));

  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
