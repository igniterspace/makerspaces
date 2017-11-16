import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { StudentsListPage }         from './pages/list/students-list.page';
import { StudentsEditPage }         from './pages/edit/students-edit.page';
import { StudentsViewPage }         from './pages/view/students-view.page';
import { StudentsGuardianPage }     from './pages/guardian/students-guardian.page';
import { StudentsGuardian_addPage } from './pages/guardian_add/students-guardian_add.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: 'students', component: StudentsListPage },
      { path: 'students/:studentsId/edit', component: StudentsEditPage },
      { path: 'students/add', component: StudentsEditPage },
      //{ path: 'students/:studentId', component: StudentsViewPage },
      { path: 'students/guardian' , component: StudentsGuardianPage },
      { path: 'students/guardian_add' , component: StudentsGuardian_addPage },
    ])],
    exports: [RouterModule]
  })
  export class StudentsRoutingModule {}