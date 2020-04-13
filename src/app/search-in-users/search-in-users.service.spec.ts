import { TestBed } from '@angular/core/testing';

import { SearchInUsersService } from './search-in-users.service';

describe('SearchInUsersService', () => {
  let service: SearchInUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
