import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessEntriesComponent } from './manage-business-entries.component';

describe('ManageBusinessEntriesComponent', () => {
  let component: ManageBusinessEntriesComponent;
  let fixture: ComponentFixture<ManageBusinessEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBusinessEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBusinessEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
