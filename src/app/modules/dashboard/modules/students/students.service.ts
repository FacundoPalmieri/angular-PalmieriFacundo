import { Injectable } from '@angular/core';
import { Student } from './models';
import { map, Observable, of } from 'rxjs';


const DataBase: Student[] = [
  { id: 1, name: 'Juan', lastName: 'Pérez' },
  { id: 2, name: 'María', lastName: 'López' },
  { id: 3, name: 'Carlos', lastName: 'García' },
  { id: 4, name: 'Ana', lastName: 'Torres' },
  { id: 5, name: 'Luis', lastName: 'Fernández' },
]
@Injectable({ providedIn: 'root' })
export class StudentsService {

  getStudentById(id: number): Observable<Student | null> {
    return of([...DataBase]).pipe(
      map((students) => students.find((student) => student.id == id) || null),
    );
  }

  getStudents$(): Observable<Student[]> {
    const students = new Observable<Student[]>((observer) => {
      setTimeout(() => {
        observer.next(DataBase);
        observer.complete();
      }, 1000);
    });
    return students;
  }

}

const numero: number = 0;

