import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';

import { CoursesService }      from '../../../common/services/course.service';
import { AddCourses }          from 'app/common/models/courses';


@Component({
  templateUrl: './courses-add.page.html',
  styleUrls  : ['./courses-add.page.css']
})

export class CoursesAddPage {
  [x: string]: any;

  private coursesService : CoursesService;
  private addCourseForm  : FormGroup;
  public Courses         : AddCourses[];
  
  course : any;
  post:any;
  

  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder) {
    this.coursesService = cs;

    this.addCourseForm = formBuilder.group({
      course_name    : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      course_year    : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      from_day       : [''],
      to_day         : [''],
      course_day     : [''],
    });
  }
  

  isValid(field : string){
    let formField = this.addCourseForm.get(field);
    return formField.valid || formField.pristine;
  }

  //Send Course details to the database..
  saveCourse(course : AddCourses) {
    this.cs.saveCourse(course).subscribe(res => console.log(course));
    //console.log(course);
    this.addCourseForm.reset();
    alert('This Course has being added to the Database..');
    
  }



}
