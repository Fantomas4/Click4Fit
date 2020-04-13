import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserEditComponent } from './details-user-edit.component';

describe('DetailsUserEditComponent', () => {
  let component: DetailsUserEditComponent;
  let fixture: ComponentFixture<DetailsUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
