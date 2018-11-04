import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from '../../../shared/service/modal.service';

import { MateriFileComponent } from './materi-file.component';

class MockModalService extends ModalService {

}

describe('MateriFileComponent', () => {
  let component: MateriFileComponent;
  let fixture: ComponentFixture<MateriFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriFileComponent ],
      providers: [{
        provide: ModalService,
        useClass: MockModalService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
