import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalWithIssuesOwnerComponent } from './proposal-with-issues-owner.component';

describe('ProposalWithIssuesOwnerComponent', () => {
  let component: ProposalWithIssuesOwnerComponent;
  let fixture: ComponentFixture<ProposalWithIssuesOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalWithIssuesOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalWithIssuesOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
