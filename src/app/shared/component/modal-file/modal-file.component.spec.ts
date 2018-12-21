import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from '../../service/modal.service';

import { ModalFileComponent } from './modal-file.component';

class MockModalService extends ModalService {

}

describe('ModalFileComponent', () => {
  let component: ModalFileComponent;
  let fixture: ComponentFixture<ModalFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFileComponent ],
      providers: [{
        provide: ModalService,
        useClass: MockModalService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
