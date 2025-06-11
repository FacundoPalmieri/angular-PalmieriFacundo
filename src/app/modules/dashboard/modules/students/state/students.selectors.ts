import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    StudentsState
} from './students.reducer';
import { Student } from '../models';

export const selectStudentsState = createFeatureSelector<StudentsState>('students');

export const selectAllStudents = createSelector(
    selectStudentsState,
    (state): Student[] => state.students ?? []
);

export const selectStudentsLoading = createSelector(
    selectStudentsState,
    (state) => state.loading
);

export const selectStudentsError = createSelector(
    selectStudentsState,
    (state) => state.error
);