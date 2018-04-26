import { Component , OnInit}  from '@angular/core';
//Service
import { AttendanceService }  from '../../../common/services/attendance.service';
//Models
import { Details }            from '../../../common/models/attendance.model';

@Component({
   templateUrl : './view.student.attendance.page.html',
   styleUrls   : ['./view.student.attendance.page.css']

 
})

export class StudentAttendancePage implements OnInit {

    private details : Details ;
    private lessons : any[];
    private student_AttendaceRecord : any[];

    constructor (private attService: AttendanceService){}

// get student lessons and attendance belongs to course
getStudentLessons(){
  console.log("details =", this.details);
  this.attService.getStudentLessons(this.details).subscribe( res => {
    this.lessons = res.item;
    console.log("lesson is this =", this.lessons);
        });
      }


//Mark student attendance by lesson (attstudent is collection of course id, lesson id and student id)
markStudentLessonAttendance(lesson){ 
  this.attService.markStudentLessonAttendance(lesson).subscribe( res => {
      console.log("Success");

      lesson.attendance_mark = 1 ;
 })
}


//edit student attendance by lesson
editlessonAttendance(lesson){ 
  this.attService.editlessonAttendance(lesson).subscribe( res => {
      console.log("Success");

      lesson.attendance_mark = 0 ;
 })
}



  ngOnInit(){

    //get details ( course + student details) from view student page
    this.attService.newFull_studentCourse.subscribe( details => this.details = details);
    
    this.getStudentLessons();
  }  
}