import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPdfComponent } from './research-pdf.component';

describe('ResearchPdfComponent', () => {
  let component: ResearchPdfComponent;
  let fixture: ComponentFixture<ResearchPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
