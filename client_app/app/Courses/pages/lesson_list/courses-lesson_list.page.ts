import { Component, Output, EventEmitter, OnInit,  Pipe, PipeTransform, ChangeDetectorRef  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListLesson, DeleteLId, AddSelectedLesson }          from 'app/common/models/courses';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  templateUrl: './courses-lesson_list.page.html',
  styleUrls: ['./courses-lesson_list.page.css']
})

export class LessonsListPage {
  

  private coursesService : CoursesService;
  private listlessons    = [] ;
  private lesson         : ListLesson[];
  selectles              : any;
  private ListallLessons : FormGroup; 
  private ListsearchedLessons : FormGroup;  
  detailForm             : boolean;
  search_res             : any;
  addles                 : any;
  updatelessons          : any;
  private listlesson     = [] ;
  courses_id             : number;
  c_id                   : any;
  name                   : any;
  l_id                   : any;
  lesson_name            : any;
  date                   : any;
  deleteid               : any;
  c_Id                   : any;
  selectlesson           : any;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    this.ListallLessons = formBuilder.group({
      id            :  [''],
      name          :  ['']
    });
    this.ListsearchedLessons = formBuilder.group({
      id          :  [''],
      name        :  ['']
 });
  }

viewLessons(courses_id: number) {
      this.cs.getlessons(courses_id).subscribe(res => {
      this.selectles = res.item;
    });
  } 


  //Send searched course's lesson to the database..  
  savesearchedLesson(sellesson : AddSelectedLesson,index, s : AddSelectedLesson) {
    let duplicates = false;
  //checking if lesson exists
    for (var c in s){
      if(s[c]['l_id'] == sellesson['id']){
        duplicates = true;
      }
    }
  //Pushing the new lesson to the array..    
    if(!duplicates){
      //need to get the correct id and send it
      var obj1 =  this.courses_id ; //assigning the course id and putting it into the object
      var full_detail = Object.assign(sellesson , {obj1}); 
      this.cs.saveCourseLesson(full_detail).subscribe(res => console.log("data saved"));
      var l_id = this.search_res[index].id;  
      var lesson_name = this.search_res[index].name; 
      var c_id = obj1; //previously this.search_res[0].c_id
      var new_lesson = Object.assign( {c_id} , {l_id} , {lesson_name});  
      this.selectles.push(new_lesson);
      this.ListallLessons.reset();
      alert('This Lesson has been added to this Course..');
    }else{
      alert('This lesson already exists in the following course. Please select another lesson. ');
    }
  }


  getc_id(courses_id){
    this.cs.getCourseID(courses_id).subscribe(res => {
      this.c_Id  = res.item;
    });
  }

//Send lesson details to lesson_update.page..
updateLesson(updatelessons) {
  this.cs.editLesson(updatelessons);
}

//Get the specific lessons of a course to this component..  
getLessonId(courses_id: number) {
  this.cs.getCourseID(courses_id).subscribe(res => {
  this.courses_id = res.item;
  this.cs.sellesson(this.courses_id)
  this.cs.selectlesson.subscribe( courses_id=> this.courses_id = courses_id)
});
} 

//Get searched lesson details to show in the frontend..  
similarLessons(search) {
  this.cs.similarLessons(search).subscribe(res => {this.search_res = res.item;
});  
}

//show the searched lessons table after the search button is clicked..
showTable(){
this.detailForm = true ;
}

hideTable(){
  this.detailForm = false ;
  }

//Delete lesson from the database when the delete button is clicked..  
deleteLesson(deleteid : DeleteLId){
  alert('Do you want to remove this lesson?');
  
  this.cs.deleteLesson(deleteid).subscribe(res=>console.log(""))
  var i;
  for (i=0; i<this.selectles.length; i++){
  
      if(this.selectles[i].l_id == deleteid.l_id ){
    this.selectles.splice(i, 1);
   
  }
}

}   

  

ngOnInit() {

//Show lesson details in the list..
this.cs.selectlesson.subscribe(courses_id => this.courses_id = courses_id)

//Send lesson details from the list to lesson_update.page..  
this.cs.updatelesson.subscribe( updatelessons => this.updatelessons = updatelessons)

//this.listLessons();
this.viewLessons(this.courses_id);
this.getc_id(this.courses_id);
}

}
