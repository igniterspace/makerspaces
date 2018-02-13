import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                           from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses } from 'app/common/models/courses';

@Component({
    templateUrl: './courses-information.page.html',
    styleUrls: ['./courses-information.page.css']
  })

  export class CoursesInformationPage {

private coursesService: CoursesService;
private listcourses = [] ;
    
private course         : ListCourses[];
private course_data    : any;
courses_id             : number;
courses_name           : string;


selectedCourseForm = new FormGroup({
  courses_id            :  new FormControl(this.courses_id),
  courses_name          :  new FormControl(this.courses_name),
  
}); 

    constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
        
      }



ngOnInit() {
  
//Show details recieved from the list in the form..
   this.cs.sCourse.subscribe( selectcour => {
    
    
     this.course_data = selectcour;
     let courses_name = selectcour.courses_name;
console.log(this.courses_name);
     this.selectedCourseForm.patchValue({
      courses_id              : selectcour.course_id,
       course_name      : selectcour.courses_name,
      
     });
   })   
 }

}