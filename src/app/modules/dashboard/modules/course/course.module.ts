import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursetableComponent } from './components/course-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    CoursetableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CourseModule { }
