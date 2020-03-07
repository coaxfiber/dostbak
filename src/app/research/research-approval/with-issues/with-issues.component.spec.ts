import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithIssuesComponent } from './with-issues.component';

describe('WithIssuesComponent', () => {
  let component: WithIssuesComponent;
  let fixture: ComponentFixture<WithIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
