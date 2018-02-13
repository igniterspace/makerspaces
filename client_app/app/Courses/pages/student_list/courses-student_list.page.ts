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
  private liststudents    = [] ;
  private student_data    : any;
  courses_name           : string;
  courses_id             : number;
  student_name  : string;
  student_id    :number;
  c_id : any;
  private moreDetails : any ;
  student:any;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 
  

  selectedStudentForm = new FormGroup({
    courses_id            :  new FormControl(this.c_id),
    courses_name          :  new FormControl(this.courses_name),
    student_id            :  new FormControl(this.student_id),
    student_name          :  new FormControl(this.student_name),
  }); 


  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }
  

  getStudents() {
    this.cs.getStudents().subscribe(res => {
      this.liststudents  = res.item;
      console.log(this.liststudents[0].id);
      console.log(res.item);
    });
  }


 
ngOnInit(): void {
  this.cs.selectstudent.subscribe(student => this.student = student)
  this.getStudents();



}

}
