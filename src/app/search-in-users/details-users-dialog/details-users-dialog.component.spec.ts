import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUsersDialogComponent } from './details-users-dialog.component';

describe('DetailsUsersDialogComponent', () => {
  let component: DetailsUsersDialogComponent;
  let fixture: ComponentFixture<DetailsUsersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUsersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
