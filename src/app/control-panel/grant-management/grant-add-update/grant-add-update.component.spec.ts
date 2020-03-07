import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAddUpdateComponent } from './grant-add-update.component';

describe('GrantAddUpdateComponent', () => {
  let component: GrantAddUpdateComponent;
  let fixture: ComponentFixture<GrantAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
