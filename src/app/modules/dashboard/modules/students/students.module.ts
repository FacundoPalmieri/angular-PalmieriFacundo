import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './state/students.effects';
import { studentsReducer } from './state/students.reducer';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    StoreModule.forFeature('students', studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
  exports: [StudentsComponent]
})
export class StudentsModule { }
