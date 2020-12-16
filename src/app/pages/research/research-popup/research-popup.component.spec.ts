import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPopupComponent } from './research-popup.component';

describe('ResearchPopupComponent', () => {
  let component: ResearchPopupComponent;
  let fixture: ComponentFixture<ResearchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
