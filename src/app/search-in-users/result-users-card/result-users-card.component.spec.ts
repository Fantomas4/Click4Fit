import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultUsersCardComponent } from './result-users-card.component';

describe('ResultUsersCardComponent', () => {
  let component: ResultUsersCardComponent;
  let fixture: ComponentFixture<ResultUsersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultUsersCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
