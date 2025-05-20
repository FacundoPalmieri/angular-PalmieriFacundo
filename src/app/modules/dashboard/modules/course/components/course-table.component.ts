import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../../core/models';
import { Course } from '../models';
import { AuthService } from '../../../../../core/services/auth.service';




@Component({
  selector: 'app-course-table',
  standalone: false,
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CoursetableComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<number>();

  @Output()
  editCourse = new EventEmitter<Course>();

  authUser$: Observable<User | null>;

  onEdit(course: Course) {
    this.editCourse.emit(course);
  }

  onDelete(id: number) {
    this.deleteCourse.emit(id);
  }

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$
  }
}
