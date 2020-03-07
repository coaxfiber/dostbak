import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPublishedOwnerComponent } from './proposal-published-owner.component';

describe('ProposalPublishedOwnerComponent', () => {
  let component: ProposalPublishedOwnerComponent;
  let fixture: ComponentFixture<ProposalPublishedOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalPublishedOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalPublishedOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
