import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageBComponent } from './dialog-message-b.component';

describe('DialogMessageBComponent', () => {
  let component: DialogMessageBComponent;
  let fixture: ComponentFixture<DialogMessageBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMessageBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
