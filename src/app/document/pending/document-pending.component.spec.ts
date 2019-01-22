import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPendingComponent } from './document-pending.component';

describe('DocumentPendingComponent', () => {
  let component: DocumentPendingComponent;
  let fixture: ComponentFixture<DocumentPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
