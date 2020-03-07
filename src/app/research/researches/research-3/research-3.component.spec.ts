import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research3Component } from './research-3.component';

describe('Research3Component', () => {
  let component: Research3Component;
  let fixture: ComponentFixture<Research3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
