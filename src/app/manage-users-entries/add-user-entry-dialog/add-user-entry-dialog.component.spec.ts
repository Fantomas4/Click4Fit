import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserEntryDialogComponent } from './add-user-entry-dialog.component';

describe('AddUserEntryDialogComponent', () => {
  let component: AddUserEntryDialogComponent;
  let fixture: ComponentFixture<AddUserEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
