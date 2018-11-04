import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

import { ConfirmationDialogService } from '../../../shared/service/confirmation-dialog.service';
import { ModalService } from '../../../shared/service/modal.service';

import { MateriDetailComponent } from './materi-detail.component';

class MockConfirmationDialogService extends ConfirmationDialogService {

}

class MockModalService extends ModalService {

}

describe('MateriDetailComponent', () => {
  let component: MateriDetailComponent;
  let fixture: ComponentFixture<MateriDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ MateriDetailComponent ],
      providers: [{
        provide: ConfirmationDialogService,
        useClass: MockConfirmationDialogService
      }, {
        provide: ModalService,
        useClass: MockModalService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
