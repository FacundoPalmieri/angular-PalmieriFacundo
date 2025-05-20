import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursetableComponent } from './components/course-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';





@NgModule({
  declarations: [
    CoursetableComponent,
    CourseComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CourseRoutingModule
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
