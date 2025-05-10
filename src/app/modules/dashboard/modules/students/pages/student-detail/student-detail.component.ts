import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models';
import { StudentsService } from '../../students.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  student$: Observable<Student | null>; // Declaramos un observable

  constructor(private activatedRoute: ActivatedRoute, private StudentsService: StudentsService) {

    const studentId = this.activatedRoute.snapshot.params['id']// Capturamos el ID de la ruta activa

    this.student$ = this.StudentsService.getStudentById(studentId); //Llamamos al método que nos retorne todo el producto según su ID
  }


}
