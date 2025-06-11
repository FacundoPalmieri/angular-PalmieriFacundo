import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Student } from './models';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';
import * as StudentsActions from './state/students.actions';
import * as StudentsSelectors from './state/students.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy {
  isEditingId: number | null = null;
  studentForm: FormGroup;
  students$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  authUser$: Observable<User | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.students$ = this.store.select(StudentsSelectors.selectAllStudents).pipe(
      map(students => students ?? [])
    );
    this.isLoading$ = this.store.select(StudentsSelectors.selectStudentsLoading);
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentData = this.studentForm.value;

    if (this.isEditingId) {
      this.store.dispatch(
        StudentsActions.updateStudent({ student: { ...studentData, id: this.isEditingId } })
      );
      this.isEditingId = null;
    } else {
      this.store.dispatch(
        StudentsActions.addStudent({ student: studentData })
      );
    }
    this.studentForm.reset();
  }

  onDeleteStudent(id: number) {
    if (confirm('¿Desea eliminar este estudiante?')) {
      this.store.dispatch(StudentsActions.deleteStudent({ id }));
    }
  }

  onEditStudent(student: Student) {
    this.isEditingId = student.id;
    this.studentForm.patchValue(student);
  }

  ngOnDestroy(): void {

  }
}