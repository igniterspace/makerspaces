import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { HttpModule }               from '@angular/http';
import { CoursesService }           from '../common/services/course.service';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';
// import { Ng2SearchPipeModule }      from 'ng2-search-filter';

import { CoursesRoutingModule }     from './courses.routes';
import { CoursesAddPage }           from './pages/add/courses-add.page';
import { CoursesListPage }          from './pages/list/courses-list.page';
import { LessonsListPage }          from './pages/lesson_list/courses-lesson_list.page';
import { CoursesInformationPage }   from './pages/information/courses-information.page';
import { LessonsAddPage }           from './pages/lesson_add/courses-lesson_add.page';
import { CourseStudentListPage }    from './pages/student_list/courses-student_list.page';


@NgModule({
  imports     : [ CommonModule, FormsModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule, CoursesRoutingModule ],
  declarations: [ CoursesAddPage, CoursesListPage, CoursesInformationPage, LessonsAddPage, LessonsListPage, CourseStudentListPage ],
  providers   : [ CoursesService ]
})
export class CoursesModule { }