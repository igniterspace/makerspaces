import { Component , OnInit}  from '@angular/core';
//Service
import { AttendanceService }  from '../../../common/services/attendance.service';
//models
import { ListLesson }         from '../../../common/models/courses';

@Component({
   templateUrl : './view.lessons.page.html',
   styleUrls   : ['./view.lessons.page.css']

})

export class ViewLessonsPage implements OnInit {

    private courseId : number;
    private lesson   : ListLesson[];


  constructor (private attService: AttendanceService){}

    //get lessons belongs to specified course
    getlessonsForCourse(){
        this.attService.getlessonsForCourse(this.courseId).subscribe( res =>{
            this.lesson = res.item;
            console.log( "hey these are fucking bitches =",this.lesson);
        })
    }



  ngOnInit(){

    // For get coutrse ID from search course page
    this.attService.newCourseId.subscribe( courseId => this.courseId = courseId);
        console.log("course id in view lessons =",this.courseId);


    this.getlessonsForCourse();
    }

}