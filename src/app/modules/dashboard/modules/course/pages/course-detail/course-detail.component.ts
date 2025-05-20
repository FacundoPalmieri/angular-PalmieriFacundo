import { Component } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../course.service';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  course$: Observable<Course | null>; // Declaramos un observable

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService) {

    const courseId = this.activatedRoute.snapshot.params['id']// Capturamos el ID de la ruta activa

    this.course$ = this.coursesService.getCourseById(courseId); //Llamamos al método que nos retorne todo el producto según su ID
  }
}
