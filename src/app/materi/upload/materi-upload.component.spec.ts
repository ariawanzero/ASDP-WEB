import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MateriService } from '../materi.service';
import { ResponseService } from '../../shared/service/response.service';

import { MateriUploadComponent } from './materi-upload.component';

class MockMateriService extends MateriService {

}

class MockResponseService extends ResponseService{

}


describe('MateriUploadComponent', () => {
  let component: MateriUploadComponent;
  let fixture: ComponentFixture<MateriUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      declarations: [ MateriUploadComponent ],
      providers: [{
        provide: MateriService,
        useClass: MockMateriService
      }, {
        provide: ResponseService,
        useClass: MockResponseService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
