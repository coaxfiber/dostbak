import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalWithIssuesComponent } from './proposal-with-issues.component';

describe('ProposalWithIssuesComponent', () => {
  let component: ProposalWithIssuesComponent;
  let fixture: ComponentFixture<ProposalWithIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalWithIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalWithIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
