import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsDialogMessageComponent } from './contactus-dialog-message.component';

describe('DialogMessage3Component', () => {
  let component: ContactUsDialogMessageComponent;
  let fixture: ComponentFixture<ContactUsDialogMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsDialogMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
