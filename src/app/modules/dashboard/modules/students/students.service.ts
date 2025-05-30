import { Injectable } from '@angular/core';
import { Student } from './models';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class StudentsService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudentById(id: number): Observable<Student | null> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  getStudents$(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

}

const numero: number = 0;

