import { TestBed } from '@angular/core/testing';

import { ManageBusinessEntriesService } from './manage-business-entries.service';

describe('ManageBusinessEntriesService', () => {
  let service: ManageBusinessEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBusinessEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
