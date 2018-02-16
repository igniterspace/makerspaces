import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListCourses }         from 'app/common/models/courses';
import { ListStudent }         from 'app/common/models/courses';
import { DeleteId }            from 'app/common/models/courses';


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
  //c_Id : any;
  private moreDetails : any ;
  private liststudents : any;
  //private student : number ;
  //private listcourse : [];
  selectles: any;
  selectstu: any;
  updatecourses  : any;
 

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllCourses : FormGroup ; 
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    this.coursesService = cs;
    this.ListAllCourses    = new FormGroup({
         listcourses       : new FormControl()
      });
  }


//Get the specific students of a course to this component..  
viewStudent(courses_id: number) {
    this.cs.getStudents(courses_id).subscribe(res => {
    this.selectstu = res.item;
    this.cs.selStudent(this.selectstu)
    this.cs.selectstudent.subscribe( selectstu=> this.selectstu = selectstu)
  });
} 

//Update (edit) course details..
viewCourse(updatecourses) {
  this.cs.updateCourse(updatecourses);
}

//Get Course details from the database and show on the list in the fronend..
listAllCourses() {
    this.cs.listAllCourses().subscribe(res => {
      this.listcourses  = res.item;
    });
  }


//Get the specific lessons of a course to this component..  
  viewLessons(courses_id: number) {
      this.cs.getlessons(courses_id).subscribe(res => {
      this.selectles = res.item;
      this.cs.sellesson(this.selectles)
      this.cs.selectlesson.subscribe( selectles=> this.selectles = selectles)
    });
  } 
  
//Delete course from the database when the delete button is clicked..  
deleteCourse(deleteid : DeleteId){
  // console.log('delete id: ',deleteid);
  alert('Do you want to remove this course?');
  
  this.cs.deleteCourse(deleteid).subscribe(res=>console.log(res))
  var i;
  // console.log(this.listcourses[0].courses_id);
  // console.log(this.listcourses.length);

  for (i=0; i<this.listcourses.length; i++){
      //console.log(this.listcourses[i].courses_id+' '+i+' '+deleteid);
    if(this.listcourses[i].courses_id == deleteid){
     // console.log("del index:",i)
      this.listcourses.splice(i, 1);
    }
  }
}   

ngOnInit(): void {

//Show course details in the list..
  this.listAllCourses();
  
//Send course details from the list to course_update.page..  
  this.cs.selectcourse.subscribe( updatecourses => this.updatecourses = updatecourses)
  //console.log(this.updatecourses);
}

}
