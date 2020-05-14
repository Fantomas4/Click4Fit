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
    this.currentUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUser {
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

    // const result = this.http.post<any>('${environment.apiUrl}/login"', JSON.stringify({email, password}),
    //   {headers: {'content-type': 'application/json'}}).pipe(map(data => {
    //     if (data.response === 200) {
    //       data.msg
    //     }
    //   })

    // nikosalex@gmail.com
    // gp123456
    console.log('mpika1');
    console.log(JSON.stringify({email, password}));
    // console.log('${environment.apiUrl}/login');
    this.http.post(`${environment.apiUrl}/login`, JSON.stringify({email, password}),
        {headers: {'content-type': 'application/json'}}).subscribe((res: any) => {
          console.log('mpika subscribe');
          if (res.response === 200) {
            if (res.user && res.user.session_id) {
              const loggedInUser: LoggedInUser = {
                firstName: res.user.name,
                lastName: res.user.surname,
                email: res.user.email,
                privilegeLevel: res.user.privilege_level,
                token: res.user.session_id
              };
              console.log('inside http post');
              console.log(res.user);

              sessionStorage.setItem('currentUser', res.user);
              this.currentUserSubject.next(loggedInUser);

            }
          }

    });

    // this.alertService.error('Error: Could not authenticate user');
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
