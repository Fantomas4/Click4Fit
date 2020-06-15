import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEntryDialogComponent } from './user-add-entry-dialog.component';

describe('UserAddEntryDialogComponent', () => {
  let component: UserAddEntryDialogComponent;
  let fixture: ComponentFixture<UserAddEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
