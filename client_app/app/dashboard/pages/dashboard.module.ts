import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormGroup , FormControl , FormBuilder, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { HttpModule }               from '@angular/http';
import { BrowserModule }            from '@angular/platform-browser';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { Ng2SearchPipeModule }      from 'ng2-search-filter';
import { DashboardPage }            from './view/dashboard.page'


@NgModule({
  imports     : [ CommonModule, FormsModule,ReactiveFormsModule, HttpModule, BrowserModule, DpDatePickerModule,Ng2SearchPipeModule ],
  declarations: [ DashboardPage ],
  providers   : [ ]
})
export class DashboardModule { }