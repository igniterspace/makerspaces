import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';

import { ListCourses, ListStudent, ListAllStudents, DeleteSId, AddStudent }         from 'app/common/models/courses';
import { studentArray }       from  '../../../common/models/courses';


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
  private liststudent     = [] ;
  course_id               : any;
  full_name               : any;
  s_id                    : any;
  c_Id                    : any;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 

  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    this.ListallStudents = formBuilder.group({
      students_name:  [''],
      students_id  :  ['']
    });
  }

//Show students in the dropdown..  
  listStudents() {
    this.cs.listAllStudents().subscribe(res => {
      this.liststudents  = res.item;
    });
  }

//View Course's Students on the list..  
  viewStudentList(courses_id) {
    this.cs.getStudents(courses_id).subscribe(res => {
    this.selectstu = res.item;
  });
} 


//Send selected student id from the dropdown and send to the database..  
  // saveassStudent(student: AddStudent) {
  //   console.log(this.students_name);
  //   var obj1 =  this.courses_id;
  //   //var obj1 =  this.c_id;
  //   var full_detail = Object.assign(student , {obj1});
  //   console.log(full_detail);
  //   this.cs.saveStudent(full_detail).subscribe(res => console.log(full_detail));
  //  // this.selectstu.push(student);
  //  alert('This Student has being added to this Course..');
  // } 
  

//Send searched student id from the dropdown and send to the database..  
savesearchStudent(search_res: string) {
  var first_name = this.search_res[0].first_name;
  var last_name = this.search_res[0].last_name;
  var full_name = Object.assign({first_name} , {last_name});

  var students_name = Object.assign({full_detail} , {full_name});

//Pushing the new student to the array..  
  var obj1 =  this.courses_id;
  var students_id = this.search_res[0].id;
  var full_detail = Object.assign({students_id} , {obj1});

  var c_id = this.c_Id[0].c_id ;
var new_student   = Object.assign( {c_id}, search_res)
    this.cs.saveStudent(full_detail).subscribe(res => console.log(full_detail));
    alert('This Student has being added to this Course..');   
    this.selectstu.push(new_student);
} 

//Get searched student details to show in the frontend..  
  similarStudent(search) {
    this.cs.similarStudent(search).subscribe(res => {this.search_res = res.item;
  });  
}

//show the searched guardian table after the search button is clicked..
showTable(){
  this.detailForm = true ;
}

hideTable(){
  this.detailForm = false ;
  }

//Delete student from the course when the delete button is clicked..  
deleteStudent(deleteid : DeleteSId){
 alert('Do you want to remove this student?');
 
 this.cs.deleteStudent(deleteid).subscribe(res=>console.log(res))
 var i;
 for (i=0; i<this.selectstu.length; i++){
   if(this.selectstu[i].id == deleteid.id){
     this.selectstu.splice(i, 1);
   }
 }
}

getc_id(courses_id){
  this.cs.getCourseID(courses_id).subscribe(res => {
    this.c_Id  = res.item;
  });
}

ngOnInit(): void {
 
//Show student details in the list..
this.cs.selectstudent.subscribe(courses_id => this.courses_id = courses_id);
this.listStudents();
this.viewStudentList(this.courses_id);
this.getc_id(this.courses_id);
}

}
