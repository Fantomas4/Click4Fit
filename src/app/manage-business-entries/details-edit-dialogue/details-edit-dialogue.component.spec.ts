import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditDialogueComponent } from './details-edit-dialogue.component';

describe('DetailsEditDialogueComponent', () => {
  let component: DetailsEditDialogueComponent;
  let fixture: ComponentFixture<DetailsEditDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEditDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
