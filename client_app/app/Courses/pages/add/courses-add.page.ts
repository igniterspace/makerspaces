import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';
import { ContextService }           from '../../../common/services/context.service';
import { AuthService }              from '../../../common/services/auth.service';

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
  course       : any;

  post:any;
  currentLocationId :number;
  private location = {};
  private locationId: number;

  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder,
              private context: ContextService,
              private auth  : AuthService    ) {
    this.coursesService = cs;

    this.addCourseForm = new FormGroup({
      course_batch   : new FormControl (null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])),
      course_name    : new FormControl (null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])),
      course_year    : new FormControl (null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
      from_day       : new FormControl (''),
      to_day         : new FormControl (''),
      course_day     : new FormControl (''),
    });
  }
  

  isValid(field : string){
    let formField = this.addCourseForm.get(field);
    return formField.valid || formField.pristine;
  }

  //Send Course details to the database..
  saveCourse(course) {
    var location = this.currentLocationId;
    var full_detail = Object.assign(course , {location});
    this.cs.saveCourse(full_detail).subscribe(res => console.log(full_detail));
    this.addCourseForm.reset();
    alert('This Course has being added to the Database..');
  }

  ngOnInit() {
//Get current location ID
this.currentLocationId = this.context.getCurrentLocationId();
console.log(this.currentLocationId);
  }

}
