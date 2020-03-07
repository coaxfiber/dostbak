import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalTrashComponent } from './proposal-trash.component';

describe('ProposalTrashComponent', () => {
  let component: ProposalTrashComponent;
  let fixture: ComponentFixture<ProposalTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
