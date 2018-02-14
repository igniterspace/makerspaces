import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses }         from 'app/common/models/courses';
import { ListStudent }         from 'app/common/models/courses';

@Component({
  templateUrl: './courses-list.page.html',
  styleUrls: ['./courses-list.page.css']
})

export class CoursesListPage {
  

  private coursesService : CoursesService;
  private listcourses    = [] ;
  private selectcour     : ListCourses;
  private course         : ListCourses[];
  private ListLesson     : ListCourses;
  private selectstu      : ListStudent;
  c_Id : any;
  private moreDetails : any ;
  private liststudents : any;
  private student : number ;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }



//Get student details from the database and show on the list in the fronend..
listAllCourses() {
    this.cs.listAllCourses().subscribe(res => {
      this.listcourses  = res.item;
      console.log(this.listcourses[0].id);
      console.log(res.item);
    });
  }

  getasStudents(as_student: number) {
    this.student = as_student ;
    console.log(this.student);
    this.cs.selstudent(this.student)
    this.cs.selectstudent.subscribe(student => this.student = student)
  } 
  
ngOnInit(): void {

//Show course details in the list..
  this.listAllCourses();
  //this.getStudents();
  this.cs.selectcourse.subscribe( selectcour => this.selectcour = selectcour);
  //this.cs.selectstudent.subscribe( selectstu => this.selectstu = selectstu);
}

}
