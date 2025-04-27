import { Component } from '@angular/core';
import { Student } from './models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  //Creamos una propiedad para saber si se está creando o editando un estudiante
  isEditingId: number | null = null;

  // Datos de la tabla
  students: Student[] = [
    { id: 1, name: 'Juan', lastName: 'Pérez' },
    { id: 2, name: 'María', lastName: 'López' },
    { id: 3, name: 'Carlos', lastName: 'García' },
    { id: 4, name: 'Ana', lastName: 'Torres' },
    { id: 5, name: 'Luis', lastName: 'Fernández' },
  ]


  studentForm: FormGroup;

  //Formulario
  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [''],
      lastName: [''],
    });
  }

  onSubmit() {
    if (this.isEditingId) {
      this.students = this.students.map((student) =>
        student.id === this.isEditingId
          ? { ...student, ...this.studentForm.value }
          : student
      );
    } else {
      this.students = [...this.students, this.studentForm.value];
    }

    this.studentForm.reset();
    this.isEditingId = null;
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
}

