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

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  
  
  constructor(private cs: CoursesService,private formBuilder: FormBuilder) {
    
  }



//Get student details from the database and show on the list in the fronend..
listAllLessons() {
    this.cs.listAllLessons().subscribe(res => {
      this.listlessons  = res.item;
      console.log(this.listlessons[0].id);
      console.log(res.item);
    });
  }


 
ngOnInit(): void {

//Show course details in the list..
  this.listAllLessons();
  //this.cs.selectcourse.subscribe( selectcour => this.selectcour = selectcour);
}

}
