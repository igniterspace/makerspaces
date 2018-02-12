import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSearchPage }    from './mark_attendace/seach_student/search.student.page';
import { ViewLessonsPage }      from './view_attendance/search_lessons/search.lessons.page';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'attendance/search',        component: StudentSearchPage } ,
        { path: 'attendance/view_lessons',  component: ViewLessonsPage }
    ])],
    exports: [RouterModule]
  })
  export class AttendanceRoutingModule { }
