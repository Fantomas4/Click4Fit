import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCard2Component } from './result-card2.component';

describe('ResultCard2Component', () => {
  let component: ResultCard2Component;
  let fixture: ComponentFixture<ResultCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
