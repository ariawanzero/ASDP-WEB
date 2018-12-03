import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriQuestionComponent } from './materi-question.component';

describe('MateriQuestionComponent', () => {
  let component: MateriQuestionComponent;
  let fixture: ComponentFixture<MateriQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
