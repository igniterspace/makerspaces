import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';

import { CoursesService }      from '../../../common/services/course.service';
import { AddLesson , AddALesson }          from 'app/common/models/courses';


@Component({
  templateUrl: './courses-lesson_add.page.html',
  styleUrls  : ['./courses-lesson_add.page.css']
})

export class LessonsAddPage {
  [x: string]: any;

  private coursesService : CoursesService;
  private addLessonForm  : FormGroup;
  private Lessons        : AddLesson[];       
  private Alesson        : AddALesson[];
  lessonExists           : boolean;
  alive: any;

  course : any;
  post:any;
  course_id :  any;
  
  

  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder) {
    this.coursesService = cs;
    this.addLessonForm  = formBuilder.group({
      'lesson_name'    : [''],
    });
  }
  
//Check the validation of the inserted lesson..
public checkLessonExists() {
  const lesson = this.addLessonForm.controls['lesson_name'].value.toLowerCase();
  this.cs.checkIfLessonExists(true, false, lesson).takeWhile(() => this.alive).subscribe(res => {

   console.log(res);
    if (res.item[0].isValid === true) {
      this.lessonExists = true;
    }
    
    else {
      //this.suggestUsername(this.addGuardianForm.controls['eaddress'].value.split('@')[0]);
      this.lessonExists = false;
    }
  });
 
}
 

  
  //Send Lesson details to the database..
  saveLesson(Alesson : AddALesson) {
    this.cs.saveLesson(Alesson).subscribe(res => console.log(Alesson));
    this.addLessonForm.reset();
    alert('This lesson has been assigned to this course');
    
  }
  
  ngOnInit() {
      
  //Get course Id..
  //this.cs.selectlesson.subscribe(courses_id => this.courses_id = courses_id)
   //this.course_id = this.selectlesson.courses_id ;    
  }

}
