import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AttendanceRoutingModule} from './attendance.routes';
//pages
import { SearchCoursesPage }      from './mark_attendace/search_courses/search.courses.page';
import { LessonAttendancePage }   from './mark_attendace/lesson_attendance/lesson.attendance.page';
import { StudentAttendancePage }  from './mark_attendace/view_student_attendance/view.student.attendance.page';
import { SearchStudentPage }      from './view_attendance/student_search/search.student.page';
import { ViewStudentsPage }       from './mark_attendace/view_students/view_students.page';
import { ViewLessonsPage}         from './mark_attendace/view_lessons/view.lessons.page';

import { AttendanceService }      from '../common/services/attendance.service';
import { SelectModule }           from 'ng2-select';

@NgModule({
  imports       : [ CommonModule, FormsModule, AttendanceRoutingModule, ReactiveFormsModule, SelectModule ],
  declarations  : [ SearchCoursesPage, SearchStudentPage, LessonAttendancePage, StudentAttendancePage, ViewStudentsPage, ViewLessonsPage ],
  providers     : [ AttendanceService ]
})
export class AttendanceModule { }
