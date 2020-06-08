import { TestBed } from '@angular/core/testing';

import { ManageMyBusinessService } from './manage-my-business.service';

describe('ManageMyBusinessService', () => {
  let service: ManageMyBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMyBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
