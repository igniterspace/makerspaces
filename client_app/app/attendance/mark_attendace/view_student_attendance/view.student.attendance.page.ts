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

    // get student lessons belongs to course
    getStudentLessons(){
      this.attService.getStudentLessons(this.details).subscribe( res => {
            console.log("For lessons =", this.details);
            this.lessons = res.item;
            console.log("lessons of student fuckkkkkkkkkk =", this.lessons);
        });
      }

    // get student attendance records from database
    getStudentAttendance(){
      this.attService.getStudentAttendance(this.details).subscribe( res => {
        console.log("student attendance = ",this.details);
        this.student_AttendaceRecord = res.item;
        console.log("Attendance record  yeahhhh=", this.student_AttendaceRecord);
    });
  }

  ngOnInit(){

    //get details ( course + student details) from view student page
    this.attService.newFull_studentCourse.subscribe( details => this.details = details);
    console.log("full details =",this.details);

    
    this.getStudentLessons();
    this.getStudentAttendance();
  }  
}