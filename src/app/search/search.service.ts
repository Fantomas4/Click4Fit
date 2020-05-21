import { Injectable } from '@angular/core';
import { ENTRIES } from '../mock-database';
import {BusinessEntry} from '../business-entry';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getCountries(): Observable<string[]>;

  getResults(): Observable<BusinessEntry[]> {
    return of(ENTRIES);
  }
}





  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

