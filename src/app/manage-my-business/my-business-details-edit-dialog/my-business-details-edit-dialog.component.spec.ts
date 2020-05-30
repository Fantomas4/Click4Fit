import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessDetailsEditDialogComponent } from './my-business-details-edit-dialog.component';

describe('DetailsEditDialogueComponent', () => {
  let component: MyBusinessDetailsEditDialogComponent;
  let fixture: ComponentFixture<MyBusinessDetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessDetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessDetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
