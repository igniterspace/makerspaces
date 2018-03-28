import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

// check everything below this
import { HttpModule }               from '@angular/http';
import { AdministrationService }    from '../common/services/administration.service';
import { ContextService }           from '../common/services/context.service';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';

// Check everything below this
import { AdministrationRoutingModule}     from './administration.routes';
import { UsersListPage }                  from './pages/list/users-list.page';
import { UsersAddPage }                   from './pages/add/users-add.page';
//import { UsersEditPage }                  from './pages/edit/users-edit.page';
// import { StudentsViewPage }               from './pages/view/students-view.page';
// import { StudentsEditPage }         from './pages/edit/students-edit.page';
// import { StudentsGuardianPage }     from './pages/guardian/students-guardian.page';
// import { StudentsGuardian_addPage } from './pages/guardian_add/students-guardian_add.page';
// import { StudentsUpdatePage }       from './pages/update/students-update.page';
// import { SearchedGuardianPage }     from './pages/searchguardian/students-searchguardian.page';

@NgModule({

  imports:      [ CommonModule, FormsModule, AdministrationRoutingModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule ],
  declarations: [ UsersListPage, UsersAddPage ],

  providers:    [ AdministrationService ]
})
export class AdministrationModule {

}
