import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutAddEntryDialogComponent } from './workout-add-entry-dialog.component';

describe('AddEntryDialogComponent', () => {
  let component: WorkoutAddEntryDialogComponent;
  let fixture: ComponentFixture<WorkoutAddEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutAddEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutAddEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
