import { Component , OnInit}     from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
//service
import { AttendanceService }  from '../../../common/services/attendance.service';

@Component({
   templateUrl : './lesson.attendance.page.html',
   styleUrls   : ['./lesson.attendance.page.css']
})



export class LessonAttendancePage implements OnInit {

    private passfull_lesson_detail : any;
    private lessonAttendance       : any[];
    private showDetails            : any;
   

    constructor (private attService: AttendanceService){}


     //get course details and lesson details to show in lesson attendance
     getCourseLessonDetails(){
        this.attService.getCourseLessonDetails(this.passfull_lesson_detail).subscribe( res =>{
            this.showDetails = res.item;
        })
    }
    
    //get course student attendance register by their lessons
    getCourseLessonAttendance(){
        this.attService.getCourseLessonAttendance(this.passfull_lesson_detail).subscribe( res =>{
            this.lessonAttendance = res.item;
        })
    }
        
    //Mark student attendance by lesson (attstudent is collection of course id, lesson id and student id)
    markStudentAttendance(student){

        var student_id =  student.id;    
        var attStudent = Object.assign( {student_id} , this.passfull_lesson_detail );
        this.attService.markStudentAttendance(attStudent).subscribe( res => {
            console.log("Success");

            student.attendance_mark = 1 ;
       })
    }

    // mark student not present ( add this function  because if someone accidently click wrong student attendance)
    editAttendance(student) {
        var student_id =  student.id;    
        var attStudent = Object.assign( {student_id} , this.passfull_lesson_detail );
        this.attService.editAttendance(attStudent).subscribe( res => {
            console.log("Success");

            student.attendance_mark = 0 ;
       })
    }



    ngOnInit(){

    // get passed values from view lessons page(course id and lesson id)
    this.attService.newFull_lesson_detail.subscribe( passfull_lesson_detail => this.passfull_lesson_detail = passfull_lesson_detail);

    this.getCourseLessonDetails();
    this.getCourseLessonAttendance();
    
    }
}