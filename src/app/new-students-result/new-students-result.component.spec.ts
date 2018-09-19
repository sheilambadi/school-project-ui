import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentsResultComponent } from './new-students-result.component';

describe('NewStudentsResultComponent', () => {
  let component: NewStudentsResultComponent;
  let fixture: ComponentFixture<NewStudentsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStudentsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
