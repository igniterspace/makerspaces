import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                           from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses } from 'app/common/models/courses';

@Component({
    templateUrl: './courses-course_update.page.html',
    styleUrls: ['./courses-course_update.page.css']
  })

  export class CoursesUpdatePage {

[x: string]: any;
    
private coursesService : CoursesService;
public Courses         : ListCourses[];
course_data : any;   
course : any;
post:any;
      
    
updateCourseForm = new FormGroup({
   courses_id            :  new FormControl(this.courses_id),
   courses_name          :  new FormControl(this.courses_name),
   courses_year          :  new FormControl(this.courses_year),
   courses_from_date     :  new FormControl(this.courses_from_date),
   courses_to_date       :  new FormControl(this.courses_to_date),
   courses_day           :  new FormControl(this.courses_day),
});  
      
constructor(private cs: CoursesService,
            private formBuilder: FormBuilder) {
    this.coursesService = cs;
    
    this.updateCourseForm = formBuilder.group({
    courses_id        : [''],
    courses_batch     : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
    courses_name      : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
    courses_year      : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
    courses_from_date : [''],
    courses_to_date   : [''],
    courses_day       : [''],
    });
    }
      
//Send updated details to the database..  
updateCourse(course_data : ListCourses) { 
  var edcourse = course_data;
  this.cs.editCourse(edcourse).subscribe(res => console.log(""));
  this.updateCourseForm.reset();
  alert('This Course has being updated..');
  }    

isValid(field : string){
    let formField = this.updateCourseForm.get(field);
    return formField.valid || formField.pristine;
      }
      
ngOnInit() {
        
//Show details recieved from the list in the form..
  this.cs.uCourse.subscribe( updatecourses => {
    let courses_name = updatecourses.courses_name;
    let name = courses_name.split(" ");
    this.bname = name[0];
    this.lname = name[1];
    
  this.course_data = updatecourses;
     
  this.updateCourseForm.patchValue({
    courses_id              : updatecourses.courses_id,
    bname                   : name[0],
    lname                   : name[1],
    courses_year            : updatecourses.courses_year,
    courses_from_date       : updatecourses.courses_from_date,
    courses_to_date         : updatecourses.courses_to_date,
    courses_day             : updatecourses.courses_day
    });
    })   
  }
    
}