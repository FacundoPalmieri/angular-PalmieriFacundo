import { Observable, Subscription } from "rxjs";
import { Course } from "./models";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { CoursesService } from "./course.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { Title } from "@angular/platform-browser";
import { User } from "../../../../core/models";

@Component({
  standalone: false,
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  isEditingId: number | null = null;
  courseForm: FormGroup
  isLoading = false;
  private coursesSubscription: Subscription | null = null;
  authUser$: Observable<User | null>;

  constructor(private fb: FormBuilder, private coursesService: CoursesService, private authService: AuthService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.authUser$ = this.authService.authUser$

  }

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



  onSubmit() {
    if (this.courseForm.invalid) {
      // Si el formulario es inválido, marcar todos los campos como tocados
      this.courseForm.markAllAsTouched();
      return;
    }
    if (this.isEditingId) {
      // Si es una edición, actualiza el estudiante
      this.courses = this.courses.map((course) =>
        course.id === this.isEditingId
          ? { ...course, ...this.courseForm.value }
          : course
      );
    } else {
      // Si es un nuevo registro, agregar al arreglo de estudiantes
      this.courses = [...this.courses, this.courseForm.value];
    }
    this.isEditingId = null;
    // Resetea el formulario solo si es necesario
    this.courseForm.reset();

  }

  onEditCourse(course: Course): void {
    this.isEditingId = course.id
    this.courseForm.patchValue(course);
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
