import { Component, OnInit } from '@angular/core';
import {SearchInUsersService} from './search-in-users.service';
import {UsersEntry} from '../users-entry';

@Component({
  selector: 'app-search-in-users',
  templateUrl: './search-in-users.component.html',
  styleUrls: ['./search-in-users.component.css']
})
export class SearchInUsersComponent implements OnInit {

  searchResults1: UsersEntry[];


  constructor(private searchInUsersService: SearchInUsersService) { }

  ngOnInit(): void {

    this.getResults1();
  }

  getResults1() {
    this.searchInUsersService.getResults1()
      .subscribe(results => this.searchResults1 = results);
  }
}
