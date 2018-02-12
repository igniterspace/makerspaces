import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AttendanceRoutingModule} from './attendance.routes';

import { StudentSearchPage }      from './mark_attendace/seach_student/search.student.page';
import { ViewLessonsPage }        from './view_attendance/search_lessons/search.lessons.page';
//import {NgSelectModule} from '@ng-select/ng-select';

import { AttendanceService }      from '../common/services/attendance.service';
import {SelectModule} from 'ng2-select';


@NgModule({
  imports       : [ CommonModule, FormsModule, AttendanceRoutingModule, ReactiveFormsModule, SelectModule ],
  declarations  : [ StudentSearchPage, ViewLessonsPage ],
  providers     : [AttendanceService]
})
export class AttendanceModule { }
