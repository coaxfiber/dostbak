import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsStatusViewComponent } from './proposals-status-view.component';

describe('ProposalsStatusViewComponent', () => {
  let component: ProposalsStatusViewComponent;
  let fixture: ComponentFixture<ProposalsStatusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsStatusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
