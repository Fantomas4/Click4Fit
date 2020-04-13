import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersEntriesComponent } from './manage-users-entries.component';

describe('ManageUsersEntriesComponent', () => {
  let component: ManageUsersEntriesComponent;
  let fixture: ComponentFixture<ManageUsersEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
