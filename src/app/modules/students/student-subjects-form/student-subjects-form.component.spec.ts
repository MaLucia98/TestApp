import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectsFormComponent } from './student-subjects-form.component';

describe('StudentSubjectsFormComponent', () => {
  let component: StudentSubjectsFormComponent;
  let fixture: ComponentFixture<StudentSubjectsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSubjectsFormComponent]
    });
    fixture = TestBed.createComponent(StudentSubjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
