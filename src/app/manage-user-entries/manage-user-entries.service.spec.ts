import { TestBed } from '@angular/core/testing';

import { ManageUserEntriesService } from './manage-user-entries.service';

describe('ManageUsersEntriesService', () => {
  let service: ManageUserEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
