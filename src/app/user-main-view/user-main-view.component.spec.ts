import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainViewComponent } from './user-main-view.component';

describe('UserMainViewComponent', () => {
  let component: UserMainViewComponent;
  let fixture: ComponentFixture<UserMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
