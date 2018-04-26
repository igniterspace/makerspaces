import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';

import { CoursesService }      from '../../../common/services/course.service';
import { UpdateLesson }          from 'app/common/models/courses';


@Component({
  templateUrl: './courses-lesson_update.html',
  styleUrls  : ['./courses-lesson_update.css']
})

export class LessonsUpdatePage {
  [x: string]: any;

  private coursesService : CoursesService;
  private upLessons      : UpdateLesson[];       

  course : any;
  post:any;
  course_id :  any;
  lesson_data : any;

  updateLessonForm = new FormGroup({
    c_id          :  new FormControl(this.c_id),
    l_id          :  new FormControl(this.l_id),
    lesson_name   :  new FormControl(this.lesson_name),
    dateh          :  new FormControl(this.dateh),
 }); 


  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder) {
    this.coursesService = cs;
    this.updateLessonForm  = formBuilder.group({
      c_id           : [''],
      l_id           : [''],
      lesson_name    : [''],
      day            : [''],
    });
  }
  
//Send updated details to the database..  
updateLesson(lesson_data : UpdateLesson) { 
  var edlesson = lesson_data;
  this.cs.updateLesson(edlesson).subscribe(res => console.log(""));
  this.updateLessonForm.reset();
  alert("This Lesson's date has being updated..");
  } 

  ngOnInit() { 
    //Show details recieved from the list in the form..
  this.cs.uLesson.subscribe( updatelessons => {
          
    this.lesson_data = updatelessons;
       
    this.updateLessonForm.patchValue({
      c_id              : updatelessons.c_id,
      l_id              : updatelessons.l_id,
      lesson_name       : updatelessons.lesson_name,
      dateh             : updatelessons.dateh,
      });
       })  
  
}

}
