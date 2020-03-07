import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research4Component } from './research-4.component';

describe('Research4Component', () => {
  let component: Research4Component;
  let fixture: ComponentFixture<Research4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
