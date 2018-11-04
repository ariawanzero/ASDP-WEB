import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriFileComponent } from './materi-file.component';

describe('MateriFileComponent', () => {
  let component: MateriFileComponent;
  let fixture: ComponentFixture<MateriFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriFileComponent ]
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
