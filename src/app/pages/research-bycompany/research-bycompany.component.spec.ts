import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchBycompanyComponent } from './research-bycompany.component';

describe('ResearchBycompanyComponent', () => {
  let component: ResearchBycompanyComponent;
  let fixture: ComponentFixture<ResearchBycompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchBycompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchBycompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
