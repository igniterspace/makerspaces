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
  //private selectstu      : ListStudent;
  c_Id : any;
  private moreDetails : any ;
  private liststudents : any;
  private student : number ;
  selectles: any;
  selectstu: any;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }


//Get the specific students of a course to this component..  
viewStudent(courses_id: number) {
  //console.log(courses_id)
    this.cs.getStudents(courses_id).subscribe(res => {
    this.selectstu = res.item;
    this.cs.selStudent(this.selectstu)
    this.cs.selectstudent.subscribe( selectstu=> this.selectstu = selectstu)
  });
} 


//Get Course details from the database and show on the list in the fronend..
listAllCourses() {
    this.cs.listAllCourses().subscribe(res => {
      this.listcourses  = res.item;
      //console.log(res.item);
    });
  }

  
//Get the specific lessons of a course to this component..  
  viewLessons(courses_id: number) {
    //console.log(courses_id)
      this.cs.getlessons(courses_id).subscribe(res => {
      this.selectles = res.item;
      this.cs.sellesson(this.selectles)
      this.cs.selectlesson.subscribe( selectles=> this.selectles = selectles)
    });
  } 
  
  
ngOnInit(): void {

//Show course details in the list..
  this.listAllCourses();
 
}

}
