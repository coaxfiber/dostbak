import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProjdiscipComponent } from './add-update-projdiscip.component';

describe('AddUpdateProjdiscipComponent', () => {
  let component: AddUpdateProjdiscipComponent;
  let fixture: ComponentFixture<AddUpdateProjdiscipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateProjdiscipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateProjdiscipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
