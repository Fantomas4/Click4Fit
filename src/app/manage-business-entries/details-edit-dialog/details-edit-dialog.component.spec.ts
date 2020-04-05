import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditDialogComponent } from './details-edit-dialog.component';

describe('DetailsEditDialogueComponent', () => {
  let component: DetailsEditDialogComponent;
  let fixture: ComponentFixture<DetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
