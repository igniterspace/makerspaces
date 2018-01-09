import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { StudentsRoutingModule}     from './students.routes';
import { StudentsListPage }         from './pages/list/students-list.page';
import { StudentsViewPage }         from './pages/view/students-view.page';
import { StudentsEditPage }         from './pages/edit/students-edit.page';
import { StudentsGuardianPage }     from './pages/guardian/students-guardian.page';
import { StudentsGuardian_addPage } from './pages/guardian_add/students-guardian_add.page';

import { StudentsService }          from '../common/services/student.service';
import { ContextService }          from '../common/services/context.service';


@NgModule({
  imports:      [ CommonModule, FormsModule, StudentsRoutingModule, ReactiveFormsModule ],
  declarations: [ StudentsListPage, StudentsViewPage, StudentsEditPage, StudentsGuardianPage, StudentsGuardian_addPage ],
  providers:    [ StudentsService ]
})
export class StudentsModule {

}
