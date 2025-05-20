import { Subscription } from "rxjs";
import { Course } from "./models";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { CoursesService } from "./course.service";

@Component({
  standalone: false,
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  isLoading = false;
  private coursesSubscription: Subscription | null = null;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = false;
    this.coursesSubscription = this.coursesService.getCourses$().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoading = false),
    });
  }

  onEditCourse(course: Course): void {
    console.log('Editar curso', course);
  }

  onDeleteCourse(courseId: number): void {
    if (confirm('¿Eliminar este curso?')) {
      this.courses = this.courses.filter((c) => c.id !== courseId);
    }
  }

  ngOnDestroy(): void {
    this.coursesSubscription?.unsubscribe();
  }
}
