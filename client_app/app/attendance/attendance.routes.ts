import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { SearchCoursesPage }     from './mark_attendace/search_courses/search.courses.page';
import { LessonAttendancePage }  from './mark_attendace/lesson_attendance/lesson.attendance.page';
import { StudentAttendancePage } from './mark_attendace/view_student_attendance/view.student.attendance.page';
import { SearchStudentPage }     from './view_attendance/student_search/search.student.page';
import { ViewStudentsPage }      from './mark_attendace/view_students/view_students.page';
import { ViewLessonsPage}        from './mark_attendace/view_lessons/view.lessons.page';


import { Component }             from '@angular/core/src/metadata/directives';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'attendance/search',                      component : SearchCoursesPage } ,
        { path: 'attendance/search/lesson_attendance',    component : LessonAttendancePage },
        { path: 'attendance/search/student/attendance',   component : StudentAttendancePage },
        { path: 'attendance/search_students',             component : SearchStudentPage },
        { path: 'attendance/search/students/:course_id',  component : ViewStudentsPage },
        { path: 'attendance/search/lessons/:course_id',   component : ViewLessonsPage }
         
    ])],
    exports: [RouterModule]
  })
  export class AttendanceRoutingModule { }
