import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';

import { CoursesService }      from '../../../common/services/course.service';
import { AddLesson }          from 'app/common/models/courses';


@Component({
  templateUrl: './courses-lesson_add.page.html',
  styleUrls  : ['./courses-lesson_add.page.css']
})

export class LessonsAddPage {
  [x: string]: any;

  private coursesService : CoursesService;
  private addLessonForm  : FormGroup;
  public  Lessons        : AddLesson[];
  
  course : any;
  post:any;
  

  constructor(private cs: CoursesService,
              private formBuilder: FormBuilder) {
    this.coursesService = cs;

    this.addLessonForm = formBuilder.group({
      lesson_name    : [''],
      day            : [''],
    });
  }
  

  ngOnInit() {

  }

  
  //Send Course details to the database..
  saveLesson(lessons : AddLesson) {
    this.cs.saveLesson(lessons).subscribe(res => console.log(lessons));
    console.log(lessons);
    this.addLessonForm.reset();
  }


}
