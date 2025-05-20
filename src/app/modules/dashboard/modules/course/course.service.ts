import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from './models';



// Simulación de base de datos
const CourseDatabase: Course[] = [
    { id: 1, title: 'Curso Angular', description: 'Aprendé Angular desde cero' },
    { id: 2, title: 'Curso Java', description: 'Programación Java avanzada' },
    { id: 3, title: 'Curso Spring Boot', description: 'Desarrollo de APIs REST' }
];

@Injectable({ providedIn: 'root' })
export class CoursesService {

    getCourseById(id: number): Observable<Course | null> {
        return of([...CourseDatabase]).pipe(
            map(courses => courses.find(course => course.id === id) || null)
        );
    }

    getCourses$(): Observable<Course[]> {
        const courses = new Observable<Course[]>((observer) => {
            setTimeout(() => {
                observer.next(CourseDatabase);
                observer.complete();
            }, 1000);
        });
        return courses;
    }
}
