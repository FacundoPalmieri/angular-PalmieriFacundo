import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from '../../../../../core/models';
import { Course } from '../models';




@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CoursetableComponent {
  @Input() dataSource!: MatTableDataSource<Course>;
  @Input() authUser$!: Observable<User | null>;
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

}
