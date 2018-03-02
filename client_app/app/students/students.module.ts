import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { HttpModule }               from '@angular/http';
import { StudentsService }          from '../common/services/student.service';
import { ContextService }           from '../common/services/context.service';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';
//import { Ng2SearchPipeModule }      from 'ng2-search-filter';

import { StudentsRoutingModule}     from './students.routes';
import { StudentsListPage }         from './pages/list/students-list.page';
import { StudentsViewPage }         from './pages/view/students-view.page';
import { StudentsEditPage }         from './pages/edit/students-edit.page';
import { StudentsGuardianPage }     from './pages/guardian/students-guardian.page';
import { StudentsGuardian_addPage } from './pages/guardian_add/students-guardian_add.page';
import { StudentsUpdatePage }       from './pages/update/students-update.page';
import { SearchedGuardianPage }     from './pages/searchguardian/students-searchguardian.page';

@NgModule({

  imports:      [ CommonModule, FormsModule, StudentsRoutingModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule ],
  declarations: [ StudentsListPage, StudentsViewPage, StudentsEditPage, StudentsGuardianPage, StudentsGuardian_addPage, StudentsUpdatePage, SearchedGuardianPage ],

  providers:    [ StudentsService ]
})
export class StudentsModule {

}
