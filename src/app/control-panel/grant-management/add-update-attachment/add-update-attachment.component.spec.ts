import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAttachmentComponent } from './add-update-attachment.component';

describe('AddUpdateAttachmentComponent', () => {
  let component: AddUpdateAttachmentComponent;
  let fixture: ComponentFixture<AddUpdateAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
