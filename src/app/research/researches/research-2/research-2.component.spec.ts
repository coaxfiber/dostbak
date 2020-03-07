import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research2Component } from './research-2.component';

describe('Research2Component', () => {
  let component: Research2Component;
  let fixture: ComponentFixture<Research2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
