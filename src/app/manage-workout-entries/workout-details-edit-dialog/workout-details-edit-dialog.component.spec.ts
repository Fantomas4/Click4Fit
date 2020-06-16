import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDetailsEditDialogComponent } from './workout-details-edit-dialog.component';

describe('DetailsEditDialogueComponent', () => {
  let component: WorkoutDetailsEditDialogComponent;
  let fixture: ComponentFixture<WorkoutDetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
