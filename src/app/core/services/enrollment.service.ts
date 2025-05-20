// src/app/services/enrollment.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    private STORAGE_KEY = 'enrollments';

    // Obtiene todas las inscripciones como objeto { [courseId]: number[] }
    private getEnrollments(): Record<number, number[]> {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    }

    // Guarda las inscripciones
    private saveEnrollments(enrollments: Record<number, number[]>) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrollments));
    }

    // Inscribe un alumno a un curso
    enrollStudent(courseId: number, studentId: number): void {
        const enrollments = this.getEnrollments();
        if (!enrollments[courseId]) {
            enrollments[courseId] = [];
        }
        if (!enrollments[courseId].includes(studentId)) {
            enrollments[courseId].push(studentId);
            this.saveEnrollments(enrollments);
        }
    }

    // Desinscribe un alumno
    unenrollStudent(courseId: number, studentId: number): void {
        const enrollments = this.getEnrollments();
        if (enrollments[courseId]) {
            enrollments[courseId] = enrollments[courseId].filter(id => id !== studentId);
            this.saveEnrollments(enrollments);
        }
    }

    // Retorna todos los alumnos inscriptos a un curso
    getStudentsForCourse(courseId: number): number[] {
        const enrollments = this.getEnrollments();
        return enrollments[courseId] || [];
    }

    // Retorna todos los cursos a los que está inscripto un alumno
    getCoursesForStudent(studentId: number): number[] {
        const enrollments = this.getEnrollments();
        return Object.entries(enrollments)
            .filter(([_, students]) => students.includes(studentId))
            .map(([courseId]) => +courseId);
    }
}
