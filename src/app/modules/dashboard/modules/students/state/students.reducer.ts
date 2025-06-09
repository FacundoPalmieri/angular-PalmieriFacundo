import { createReducer, on } from '@ngrx/store';
import * as StudentsActions from './students.actions';
import { Student } from '../models';

export interface StudentsState {
    students: Student[];
    loading: boolean;
    error: any;
}

export const initialState: StudentsState = {
    students: [],
    loading: false,
    error: null
};

export const studentsReducer = createReducer(
    initialState,
    on(StudentsActions.loadStudents, state => ({ ...state, loading: true })),
    on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({ ...state, students, loading: false })),
    on(StudentsActions.loadStudentsFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(StudentsActions.addStudentSuccess, (state, { student }) => ({
        ...state,
        students: [...state.students, student]
    })),
    on(StudentsActions.updateStudentSuccess, (state, { student }) => ({
        ...state,
        students: state.students.map(s => s.id === student.id ? student : s)
    })),
    on(StudentsActions.deleteStudentSuccess, (state, { id }) => ({
        ...state,
        students: state.students.filter(s => s.id !== id)
    }))
);
