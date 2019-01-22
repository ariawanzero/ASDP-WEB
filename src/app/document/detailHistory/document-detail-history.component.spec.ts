import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailHistoryComponent } from './document-detail-history.component';

describe('DocumentDetailHistoryComponent', () => {
  let component: DocumentDetailHistoryComponent;
  let fixture: ComponentFixture<DocumentDetailHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDetailHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
