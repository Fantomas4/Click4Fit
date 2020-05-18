import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsEditDialogComponent } from './business-details-edit-dialog.component';

describe('DetailsEditDialogueComponent', () => {
  let component: BusinessDetailsEditDialogComponent;
  let fixture: ComponentFixture<BusinessDetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});