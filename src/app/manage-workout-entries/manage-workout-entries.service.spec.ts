import { TestBed } from '@angular/core/testing';

import { ManageWorkoutEntriesService } from './manage-workout-entries.service';

describe('ManageWorkoutEntriesService', () => {
  let service: ManageWorkoutEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageWorkoutEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
