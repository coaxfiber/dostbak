import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDisciplineComponent } from './project-discipline.component';

describe('ProjectDisciplineComponent', () => {
  let component: ProjectDisciplineComponent;
  let fixture: ComponentFixture<ProjectDisciplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDisciplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
