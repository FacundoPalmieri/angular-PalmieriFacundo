import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from './models';
import { HttpClient } from '@angular/common/http';





@Injectable({ providedIn: 'root' })
export class CoursesService {
    private apiUrl = 'http://localhost:3000/courses';

    constructor(private http: HttpClient) { }

    getCourseById(id: number): Observable<Course | null> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
            map(course => course || null)
        );
    }

    getCourses$(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }

    enrollStudent(courseId: number, studentId: number): Observable<Course> {
        return this.getCourseById(courseId).pipe(
            switchMap(course => {
                if (!course) {
                    throw new Error('Curso no encontrado');
                }

                const updatedStudents = course.students || [];

                if (!updatedStudents.includes(studentId)) {
                    updatedStudents.push(studentId);
                }

                const updatedCourse: Course = {
                    ...course,
                    students: updatedStudents
                };

                return this.http.put<Course>(`${this.apiUrl}/${courseId}`, updatedCourse);
            })
        );
    }
}