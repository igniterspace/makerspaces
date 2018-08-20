import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { StudentsListPage }         from './pages/list/students-list.page';

import { StudentsViewPage }         from './pages/view/students-view.page';
import { StudentsGuardianPage }     from './pages/guardian/students-guardian.page';
import { StudentsGuardian_addPage } from './pages/guardian_add/students-guardian_add.page';
import { StudentsUpdatePage }       from './pages/update/students-update.page';
import { SearchedGuardianPage }     from './pages/searchguardian/students-searchguardian.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'students',                   component: StudentsListPage },

      { path: 'students/guardian' ,         component: StudentsGuardianPage },
      { path: 'students/guardian_add' ,     component: StudentsGuardian_addPage },
      { path: 'students/edit' ,             component: StudentsListPage },
      { path: 'students/update/:s.id' ,     component: StudentsUpdatePage },
      { path: 'students/searchguardian' ,   component: SearchedGuardianPage },
      { path: 'students/guardian/:search' , component: StudentsGuardianPage }

    ])],
    exports: [RouterModule]
  })
  export class StudentsRoutingModule {}