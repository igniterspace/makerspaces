import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }                           from '../../../common/services/course.service';
import { ContextService }           from '../../../common/services/context.service';
import { AuthService }              from '../../../common/services/auth.service';

import { ListCourses, ListStudent, DeleteId }       from 'app/common/models/courses';



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
  private moreDetails : any ;
  private liststudents : any;
  selectles: any;
  selectstu: any;
  updatecourses  : any;
  addles: any;
  courses_id : any;
  c_id     : any;
  currentLocationId :number;
  private location = {};
  private locationId: number;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllCourses : FormGroup ; 
  
  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder,
              private context: ContextService,
              private auth  : AuthService ) {
    this.coursesService = cs;
    this.ListAllCourses    = new FormGroup({
         listcourses       : new FormControl()
      });
  }


//Send the course id to student_list.page..  
viewStudent(courses_id: number) {
    this.cs.selStudent(courses_id)
    this.cs.selectstudent.subscribe( courses_id=> this.courses_id = courses_id)
} 

//Send course details to course_update.page..
viewCourse(updatecourses) {
  this.cs.updateCourse(updatecourses);
}

//Get Course details from the database and show on the list in the frontend..
listAllCourses(currentLocationId) {
  console.log("function:", currentLocationId);
    this.cs.listAllCourses(currentLocationId).subscribe(res => {
      this.listcourses  = res.item;
      console.log("return:",this.listcourses);
    });
  }


//Send the course id to lesson_list.page..  
  viewLessons(courses_id: number) {
    this.cs.sellesson(courses_id)
    this.cs.selectlesson.subscribe( courses_id=> this.courses_id = courses_id)
} 

//Delete course from the database when the delete button is clicked..  
deleteCourse(deleteid : DeleteId){
  alert('Do you want to remove this course?');
  
  this.cs.deleteCourse(deleteid).subscribe(res=>console.log(res))
  var i;

  for (i=0; i<this.listcourses.length; i++){
    if(this.listcourses[i].courses_id == deleteid){
      this.listcourses.splice(i, 1);
    }
  }
}   

ngOnInit(): void {

//Get current location ID
this.currentLocationId = this.context.getCurrentLocationId();
console.log(this.currentLocationId);  

//Show course details in the list..
  this.listAllCourses(this.currentLocationId);
  
//Send course details from the list to course_update.page..  
  this.cs.selectcourse.subscribe( updatecourses => this.updatecourses = updatecourses)

//Send courses_id to student_list.page..  
  this.cs.selectstudent.subscribe(courses_id => this.courses_id = courses_id)
  
//Send courses_id to lesson_list.page..
  this.cs.selectlesson.subscribe( courses_id=> this.courses_id = courses_id)


}

}
