import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses }         from 'app/common/models/courses';
import { ListStudent }         from 'app/common/models/courses';


@Component({
  templateUrl: './courses-student_list.page.html',
  styleUrls: ['./courses-student_list.page.css']
})

export class CourseStudentListPage {
  

  private coursesService : CoursesService;
  private liststudents   : ListStudent ;
  private student_data    : any;
  courses_name           : string;
  courses_id             : number;
  student_name  : string;
  student_id    :number;
  c_id : any;
  private moreDetails : any ;
  student:any;
  selectstu: any;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 

  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }

 
ngOnInit(): void {
 
//Shoe student details in the list..
this.cs.selectstudent.subscribe(selectstu => this.selectstu = selectstu)

}

}
