import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessAddEntryDialogComponent } from './my-business-add-entry-dialog.component';

describe('AddEntryDialogComponent', () => {
  let component: MyBusinessAddEntryDialogComponent;
  let fixture: ComponentFixture<MyBusinessAddEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessAddEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessAddEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
