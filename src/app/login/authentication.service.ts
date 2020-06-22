import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.post<any>(`${environment.apiUrl}/login`, JSON.stringify({email, password}),
      {headers: {'Content-type': 'application/json'}, observe: 'response'}).pipe(map((res: any) => {
            const data = res.body;
            if (data.user && data.user.token) {
              sessionStorage.setItem('currentUser', JSON.stringify(data.user));
              this.currentUserSubject.next(data.user);
            }
            return res;
    }));

  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

