import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';


const routes: Routes = [
    {
        path: '', // ruta vacía para que al ir a /dashboard/course se cargue este componente
        component: CourseComponent
    },
    {
        path: ':id',
        component: CourseDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
