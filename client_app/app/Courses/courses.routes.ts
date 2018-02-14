import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { CoursesAddPage }                   from './pages/add/courses-add.page';
import { CoursesListPage }                  from './pages/list/courses-list.page';
import { CoursesInformationPage }           from './pages/information/courses-information.page';
import { LessonsAddPage }                   from './pages/lesson_add/courses-lesson_add.page';
import { LessonsListPage }                  from './pages/lesson_list/courses-lesson_list.page';
import { CourseStudentListPage }            from './pages/student_list/courses-student_list.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'courses', component: CoursesAddPage },
      { path: 'courses/list', component: CoursesListPage },
      { path: 'courses/list/lesson_list/:c.courses_id', component: LessonsListPage },
      //{ path: 'courses/list/information/:c.courses_id', component: CoursesInformationPage },
      { path: 'courses/list/lesson_list/:c.courses_id/lesson_add', component: LessonsAddPage },
      { path: 'courses/list/student_list/:c.courses_id', component: CourseStudentListPage },
    ])],
    exports: [RouterModule]
  })
  export class CoursesRoutingModule {}