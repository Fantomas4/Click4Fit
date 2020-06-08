import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  register(firstName: string, lastName: string, birthDate: string, email: string, password: string) {
    const postData = birthDate === undefined ? {name: firstName, surname: lastName, email, password} : {name: firstName,
      surname: lastName, birthdate: birthDate, email, password};

    return this.http.post<any>(`${environment.apiUrl}/register`, JSON.stringify(postData), {headers: {'Content-type': 'application/json'},
      observe: 'response'}).pipe(map(
        (res: any) => {
          console.log('RECEIVED 1: ', res);
          return res;
    }));
  }
}
