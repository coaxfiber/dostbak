import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalPublishedComponent } from './proposal-published.component';

describe('ProposalPublishedComponent', () => {
  let component: ProposalPublishedComponent;
  let fixture: ComponentFixture<ProposalPublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalPublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
