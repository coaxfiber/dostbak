import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Research1Component } from './research-1.component';

describe('Research1Component', () => {
  let component: Research1Component;
  let fixture: ComponentFixture<Research1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Research1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Research1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
