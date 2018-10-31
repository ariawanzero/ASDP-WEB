import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriListComponent } from './materi-list.component';

describe('MateriListComponent', () => {
  let component: MateriListComponent;
  let fixture: ComponentFixture<MateriListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
