import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusChangeProposalComponent } from './status-change-proposal.component';

describe('StatusChangeProposalComponent', () => {
  let component: StatusChangeProposalComponent;
  let fixture: ComponentFixture<StatusChangeProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusChangeProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChangeProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
