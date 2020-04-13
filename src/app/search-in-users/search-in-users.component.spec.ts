import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInUsersComponent } from './search-in-users.component';

describe('SearchInUsersComponent', () => {
  let component: SearchInUsersComponent;
  let fixture: ComponentFixture<SearchInUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
