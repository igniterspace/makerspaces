import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { HttpModule }               from '@angular/http';
import { CoursesService }           from '../common/services/course.service';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { CoursesRoutingModule }     from './courses.routes';
import { CoursesAddPage }           from './pages/add/courses-add.page';
import { CoursesListPage }          from './pages/list/courses-list.page';
import { LessonsListPage }          from './pages/lesson_list/courses-lesson_list.page';
import { CoursesUpdatePage }        from './pages/course_update/courses-course_update.page';
import { LessonsAddPage }           from './pages/lesson_add/courses-lesson_add.page';
import { CourseStudentListPage }    from './pages/student_list/courses-student_list.page';
import { LessonsUpdatePage }        from './pages/lesson_update/courses-lesson_update';

@NgModule({

  imports     : [ CommonModule, FormsModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule, CoursesRoutingModule ],
  declarations: [ CoursesAddPage, CoursesListPage, CoursesUpdatePage, LessonsAddPage, LessonsListPage, CourseStudentListPage, LessonsUpdatePage ],
  providers   : [ CoursesService ]
})

export class CoursesModule { }