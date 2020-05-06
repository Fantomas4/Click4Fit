import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverDialogMessageComponent } from './recover-dialog-message.component';

describe('RecoverDialogMessageComponent', () => {
  let component: RecoverDialogMessageComponent;
  let fixture: ComponentFixture<RecoverDialogMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverDialogMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
