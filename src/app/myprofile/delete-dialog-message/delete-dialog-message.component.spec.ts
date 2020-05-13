import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDialogMessageComponent } from './delete-dialog-message.component';

describe('DeleteDialogMessageComponent', () => {
  let component: DeleteDialogMessageComponent;
  let fixture: ComponentFixture<DeleteDialogMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
