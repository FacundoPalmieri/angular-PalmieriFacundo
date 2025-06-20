import { createAction, props } from '@ngrx/store';
import { Student } from '../models';

export const loadStudents = createAction('[Students] Load Students');
export const loadStudentsSuccess = createAction('[Students] Load Students Success', props<{ students: Student[] }>());
export const loadStudentsFailure = createAction('[Students] Load Students Failure', props<{ error: any }>());

export const addStudent = createAction('[Students] Add Student', props<{ student: Student }>());
export const addStudentSuccess = createAction('[Students] Add Student Success', props<{ student: Student }>());
export const addStudentFailure = createAction('[Students] Add Student Failure', props<{ error: any }>());

export const updateStudent = createAction('[Students] Update Student', props<{ student: Student }>());
export const updateStudentSuccess = createAction('[Students] Update Student Success', props<{ student: Student }>());
export const updateStudentFailure = createAction('[Students] Update Student Failure', props<{ error: any }>());

export const deleteStudent = createAction('[Students] Delete Student', props<{ id: number }>());
export const deleteStudentSuccess = createAction('[Students] Delete Student Success', props<{ id: number }>());
export const deleteStudentFailure = createAction('[Students] Delete Student Failure', props<{ error: any }>());