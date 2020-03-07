import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResearchDetailComponent } from './view-research-detail.component';

describe('ViewResearchDetailComponent', () => {
  let component: ViewResearchDetailComponent;
  let fixture: ComponentFixture<ViewResearchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResearchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResearchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
