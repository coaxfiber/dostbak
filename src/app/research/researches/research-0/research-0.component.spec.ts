import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research0Component } from './research-0.component';

describe('Research0Component', () => {
  let component: Research0Component;
  let fixture: ComponentFixture<Research0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
