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
      this.courseForm.markAllAsTouched();
      return;
    }
    const formValue = this.courseForm.value;

    if (this.isEditingId) {
      // Actualizar curso en el backend
      this.coursesService.updateCourse(this.isEditingId, { ...formValue, id: this.isEditingId, students: [] }).subscribe({
        next: (updatedCourse) => {
          this.courses = this.courses.map(course =>
            course.id === this.isEditingId ? updatedCourse : course
          );
          this.isEditingId = null;
          this.courseForm.reset();
        },
        error: (err) => console.error(err)
      });
    } else {
      // Crear curso en el backend
      this.coursesService.createCourse({ ...formValue, students: [] }).subscribe({
        next: (newCourse) => {
          this.courses = [...this.courses, newCourse];
          this.courseForm.reset();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onEditCourse(course: Course): void {
    this.isEditingId = course.id
    this.courseForm.patchValue(course);
  }

  onDeleteCourse(courseId: number): void {
    if (confirm('¿Eliminar este curso?')) {
      this.coursesService.deleteCourse(courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter((c) => c.id !== courseId);
        },
        error: (err) => console.error(err)
      });
    }
  }

  ngOnDestroy(): void {
    this.coursesSubscription?.unsubscribe();
  }
}
