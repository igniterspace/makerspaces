import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { CoursesService }      from '../../../common/services/course.service';
import { ListLesson }          from 'app/common/models/courses';


@Component({
  templateUrl: './courses-lesson_list.page.html',
  styleUrls: ['./courses-lesson_list.page.css']
})

export class LessonsListPage {
  

  private coursesService : CoursesService;
  private listlessons    = [] ;
  //private selectcour     : ListCourses;
  private lesson         : ListLesson[];
    selectles: any;


  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }

 
ngOnInit() {

//Shoe lesson details in the list..
this.cs.selectlesson.subscribe(selectles => this.selectles = selectles)
    
}

}
