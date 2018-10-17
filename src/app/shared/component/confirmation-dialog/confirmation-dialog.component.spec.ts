import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogService } from '../../service/confirmation-dialog.service';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

class MockConfirmationDialogService extends ConfirmationDialogService {

}

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [{
        provide: ConfirmationDialogService,
        useClass: MockConfirmationDialogService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
