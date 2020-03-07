import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantManagementComponent } from './grant-management.component';

describe('GrantManagementComponent', () => {
  let component: GrantManagementComponent;
  let fixture: ComponentFixture<GrantManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
