import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposalDetailsComponent } from './view-proposal-details.component';

describe('ViewProposalDetailsComponent', () => {
  let component: ViewProposalDetailsComponent;
  let fixture: ComponentFixture<ViewProposalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProposalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
