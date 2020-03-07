import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research5Component } from './research-5.component';

describe('Research5Component', () => {
  let component: Research5Component;
  let fixture: ComponentFixture<Research5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
