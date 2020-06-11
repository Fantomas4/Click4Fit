import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkoutEntriesComponent } from './manage-workout-entries.component';

describe('ManageWorkoutEntriesComponent', () => {
  let component: ManageWorkoutEntriesComponent;
  let fixture: ComponentFixture<ManageWorkoutEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkoutEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkoutEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
