import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessage3Component } from './dialog-message3.component';

describe('DialogMessage3Component', () => {
  let component: DialogMessage3Component;
  let fixture: ComponentFixture<DialogMessage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMessage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
