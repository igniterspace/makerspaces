import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses }         from 'app/common/models/courses';
import { ListStudent }         from 'app/common/models/courses';
import { ListAllStudents }     from 'app/common/models/courses';


@Component({
  templateUrl: './courses-student_list.page.html',
  styleUrls: ['./courses-student_list.page.css']
})

export class CourseStudentListPage {
  

  private coursesService  : CoursesService;
  private ListallStudents : FormGroup;  
  private liststudents    : ListAllStudents ;
  private student_data    : any;
  courses_name            : string;
  courses_id              : number;
  student_name            : string;
  student_id              : number;
  c_id                    : any;
  private moreDetails     : any ;
  student                 : any;
  selectstu               : any;
  students_id             : number;
  students_name           : string;
  search_res              : any;
  detailForm              :boolean;
  
  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 

  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    this.ListallStudents = formBuilder.group({
      students_name:  [''],
    });
  }

  listStudents() {
    this.cs.listAllStudents().subscribe(res => {
      this.liststudents  = res.item;
      console.log(res.item);
    });
  }

  
  //Get searched guardian details to show in the frontend..  
  similarStudent(search) {
    console.log(search);
    this.cs.similarStudent(search).subscribe(res => {this.search_res = res.item;
    console.log(this.search_res);
  });  
}

//show the searched guardian table after the search button is clicked..
showTable(){
  this.detailForm = true ;
}



ngOnInit(): void {
 
//Show student details in the list..
this.cs.selectstudent.subscribe(selectstu => this.selectstu = selectstu)

this.listStudents();
}

}
