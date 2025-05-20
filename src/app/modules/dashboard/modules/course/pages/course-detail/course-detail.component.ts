import { Component } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../course.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { User } from '../../../../../../core/models';
import { EnrollmentService } from '../../../../../../core/services/enrollment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  course$: Observable<Course | null>; // Declaramos un observable
  currentUser: User | null = null;
  isEnrolled = false;
  enrolledStudents: User[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private http: HttpClient
  ) {
    const courseId = +this.activatedRoute.snapshot.params['id'];

    this.course$ = this.coursesService.getCourseById(courseId);

    this.authService.authUser$.subscribe(user => {
      this.currentUser = user;

      if (!user) return;

      const enrolledStudentIds = this.enrollmentService.getStudentsForCourse(courseId);
      this.isEnrolled = enrolledStudentIds.includes(user.id);

      if (user.role === 'admin') {
        // Trae todos los usuarios con rol 'user'
        this.http.get<User[]>('http://localhost:3000/users?role=user').subscribe((allUsers) => {
          // Filtra solo los que están inscriptos
          this.enrolledStudents = allUsers.filter((u) => enrolledStudentIds.includes(u.id));
        });
      }
    });
  }


  enroll(courseId: number): void {
    if (!this.currentUser) return;

    this.enrollmentService.enrollStudent(courseId, this.currentUser.id);
    this.isEnrolled = true;
    alert('¡Te inscribiste al curso!');
  }


  unenroll(courseId: number, studentId: number): void {
    this.enrollmentService.unenrollStudent(courseId, studentId);
    this.enrolledStudents = this.enrolledStudents?.filter(s => s.id !== studentId);
  }


}
