import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MatListModule } from '@angular/material/list';
import { StudentsModule } from './modules/students/students.module';
import { Course } from './modules/course/models/index';
import { CourseModule } from './modules/course/course.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    StudentsModule,
    CourseModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
