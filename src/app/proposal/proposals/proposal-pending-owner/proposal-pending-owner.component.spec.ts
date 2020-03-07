import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPendingOwnerComponent } from './proposal-pending-owner.component';

describe('ProposalPendingOwnerComponent', () => {
  let component: ProposalPendingOwnerComponent;
  let fixture: ComponentFixture<ProposalPendingOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalPendingOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalPendingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
