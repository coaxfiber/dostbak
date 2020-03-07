import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClassificationTypeComponent } from './project-classification-type.component';

describe('ProjectClassificationTypeComponent', () => {
  let component: ProjectClassificationTypeComponent;
  let fixture: ComponentFixture<ProjectClassificationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectClassificationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectClassificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
