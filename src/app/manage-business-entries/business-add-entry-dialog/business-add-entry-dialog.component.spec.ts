import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddEntryDialogComponent } from './business-add-entry-dialog.component';

describe('AddEntryDialogComponent', () => {
  let component: BusinessAddEntryDialogComponent;
  let fixture: ComponentFixture<BusinessAddEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
