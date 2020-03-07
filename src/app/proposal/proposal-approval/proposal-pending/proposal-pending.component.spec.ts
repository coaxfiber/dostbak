import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPendingComponent } from './proposal-pending.component';

describe('ProposalPendingComponent', () => {
  let component: ProposalPendingComponent;
  let fixture: ComponentFixture<ProposalPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
