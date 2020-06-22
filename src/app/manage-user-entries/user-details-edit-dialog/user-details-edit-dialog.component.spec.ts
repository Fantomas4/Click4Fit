import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsEditDialogComponent } from './user-details-edit-dialog.component';

describe('DetailsUserEditComponent', () => {
  let component: UserDetailsEditDialogComponent;
  let fixture: ComponentFixture<UserDetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
