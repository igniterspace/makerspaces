import { Component , OnInit}  from '@angular/core';
//Service
import { AttendanceService }  from '../../../common/services/attendance.service';
//models
import { ListLesson }         from '../../../common/models/courses';
import { Course }             from '../../../common/models/courses';

@Component({
   templateUrl : './view.lessons.page.html',
   styleUrls   : ['./view.lessons.page.css']

})

export class ViewLessonsPage implements OnInit {

    private courseId : number;
    private lesson   : ListLesson[];
    private courseForLesson : Course;

  constructor (private attService: AttendanceService){}

    //get lessons belongs to specified course
    getlessonsForCourse(){
        this.courseId = this.courseForLesson.id;
        this.attService.getCourseLessons( this.courseId ).subscribe( res =>{
        this.lesson = res.item;
        })
    }
    //merging and passing selected course ID and lesson ID to lesson attendance page
    passLessonDetails(lessonDetail : any) {

            var lesson_ID = lessonDetail.id ;
            var course_ID = this.courseForLesson.id;
            var full_lesson_detail = Object.assign( {lesson_ID} , {course_ID} );

            this.attService.passFull_lesson_detail(full_lesson_detail)
            this.attService.newFull_lesson_detail.subscribe( passfull_lesson_detail => passfull_lesson_detail = passfull_lesson_detail);
        
      };

  ngOnInit(){

    // For get course ID from search course page
    this.attService.newCourseDeatails.subscribe( courseForLesson => this.courseForLesson = courseForLesson);

    this.getlessonsForCourse();
    }

}