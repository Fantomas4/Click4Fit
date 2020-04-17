import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserEntriesComponent } from './manage-user-entries.component';

describe('ManageUsersEntriesComponent', () => {
  let component: ManageUserEntriesComponent;
  let fixture: ComponentFixture<ManageUserEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
