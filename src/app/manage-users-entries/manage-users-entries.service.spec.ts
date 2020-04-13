import { TestBed } from '@angular/core/testing';

import { ManageUsersEntriesService } from './manage-users-entries.service';

describe('ManageUsersEntriesService', () => {
  let service: ManageUsersEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUsersEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
