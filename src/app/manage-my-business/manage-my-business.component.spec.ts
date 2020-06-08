import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyBusinessComponent } from './manage-my-business.component';

describe('ManageMyBusinessComponent', () => {
  let component: ManageMyBusinessComponent;
  let fixture: ComponentFixture<ManageMyBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMyBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
