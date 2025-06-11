import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StudentsActions from './students.actions';
import { StudentsService } from '../students.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsEffects {
  actions$ = inject(Actions);
  studentsService = inject(StudentsService);

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      mergeMap(() =>
        this.studentsService.getStudents$().pipe(
          map((students) => StudentsActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(StudentsActions.loadStudentsFailure({ error }))
          )
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.addStudent),
      mergeMap(({ student }) =>
        this.studentsService.createStudent(student).pipe(
          map((newStudent) =>
            StudentsActions.addStudentSuccess({ student: newStudent })
          ),
          catchError((error) =>
            of(StudentsActions.addStudentFailure({ error }))
          )
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      mergeMap(({ student }) =>
        this.studentsService.updateStudent(Number(student.id), student).pipe(
          map((updatedStudent) =>
            StudentsActions.updateStudentSuccess({ student: updatedStudent })
          ),
          catchError((error) =>
            of(StudentsActions.updateStudentFailure({ error }))
          )
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      mergeMap(({ id }) =>
        this.studentsService.deleteStudent(id).pipe(
          map(() => StudentsActions.deleteStudentSuccess({ id })),
          catchError((error) =>
            of(StudentsActions.deleteStudentFailure({ error }))
          )
        )
      )
    )
  );
}