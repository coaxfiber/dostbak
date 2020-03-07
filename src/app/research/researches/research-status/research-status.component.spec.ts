import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchStatusComponent } from './research-status.component';

describe('ResearchStatusComponent', () => {
  let component: ResearchStatusComponent;
  let fixture: ComponentFixture<ResearchStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
