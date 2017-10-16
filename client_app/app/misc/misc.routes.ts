import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './notfound.page';

@NgModule({
    imports: [RouterModule.forChild([
      { path: '**', component: NotFoundPage }
    ])],
    exports: [RouterModule]
  })
  export class MiscRoutingModule {}