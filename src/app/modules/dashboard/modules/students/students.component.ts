import { Component, OnDestroy } from '@angular/core';
import { Student } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from './students.service';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnDestroy {

  //Creamos una propiedad para saber si se está creando o editando un estudiante
  isEditingId: number | null = null;
  studentForm: FormGroup;
  students: Student[] = [];
  isLoading: boolean = false;
  studentsSubscription: Subscription | null = null;

  authUser$: Observable<User | null>;

  //Formulario
  constructor(private fb: FormBuilder, private studentsService: StudentsService, private authService: AuthService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.authUser$ = this.authService.authUser$


  }

  ngOnInit(): void {
    this.loadStudentsObservable();

  }

  loadStudentsObservable() {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
      .getStudents$()
      .pipe(first())
      .subscribe({
        next: (datos) => {
          this.students = datos;
        },
        error: (error) => console.error(error),
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    if (this.isEditingId) {
      // Edición: persistir en la base de datos
      this.studentsService.updateStudent(this.isEditingId, this.studentForm.value).subscribe({
        next: (updatedStudent) => {
          this.students = this.students.map((student) =>
            student.id === this.isEditingId ? updatedStudent : student
          );
          this.isEditingId = null;
          this.studentForm.reset();
        },
        error: (err) => {

          console.error('Error al actualizar:', err);
        }
      });
    } else {
      this.studentsService.createStudent(this.studentForm.value).subscribe({
        next: (newStudent) => {
          this.students = [...this.students, newStudent];
          this.studentForm.reset();
        },
        error: (err) => {

          console.error('Error al crear:', err);
        }
      });
    }
  }


  onDeleteStudent(id: number) {
    if (confirm('¿Desea eliminar este estudiante?')) {
      this.studentsService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter((student) => student.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        }
      });
    }
  }

  onEditStudent(student: Student) {
    this.isEditingId = student.id
    this.studentForm.patchValue(student);
  }

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }
}

