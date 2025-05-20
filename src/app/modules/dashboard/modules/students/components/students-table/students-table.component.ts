import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { User } from '../../../../../../core/models';



@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})


export class StudentsTableComponent {

  //Id para cada columna de la tabla
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];

  //Datos de la tabla
  @Input()
  dataSource: Student[] = []

  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<Student>();

  authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$
  }

}

