import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogMessageComponent } from './update-dialog-message.component';

describe('UpdateDialogMessageComponent', () => {
  let component: UpdateDialogMessageComponent;
  let fixture: ComponentFixture<UpdateDialogMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDialogMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
