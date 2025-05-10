import { Component, OnDestroy } from '@angular/core';
import { Student } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from './students.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

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


  //Formulario
  constructor(private fb: FormBuilder, private studentsService: StudentsService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
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
      // Si el formulario es inválido, marcar todos los campos como tocados
      this.studentForm.markAllAsTouched();
      return;
    }
    if (this.isEditingId) {
      // Si es una edición, actualiza el estudiante
      this.students = this.students.map((student) =>
        student.id === this.isEditingId
          ? { ...student, ...this.studentForm.value }
          : student
      );
    } else {
      // Si es un nuevo registro, agregar al arreglo de estudiantes
      this.students = [...this.students, this.studentForm.value];
    }
    this.isEditingId = null;
    // Resetea el formulario solo si es necesario
    this.studentForm.reset();

  }


  onDeleteStudent(id: number) {
    if (confirm('¿Desea eliminar este estudiante?')) {
      this.students = this.students.filter((student) => student.id !== id);
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

