import { Component , OnInit}  from '@angular/core';
//Models
import { Course }        from '../../../common/models/courses';
// services
import { AttendanceService }  from '../../../common/services/attendance.service';


@Component({
   templateUrl : './view_students.page.html',
   styleUrls   : ['./view_students.page.css']

 
})

export class ViewStudentsPage implements OnInit {
  
    public students   : any[];
    private course    : Course;
    private course_id : number;
    private student_attenance : any[];
    private student_lessons   : any[];

    constructor (private attService: AttendanceService){}

    // Get selected student lessons from database
    getStudentAttendance( student : any) {
        var s_id = student.student_id;
        var courseID = this.course.id;
        var student_course = Object.assign( {s_id} , {courseID} );

        // pass details of course and student to view attendance page( shared service)
        var details = Object.assign( student , this.course);
        this.attService.passStudent_course(details)
        this.attService.newFull_studentCourse.subscribe( details => details = details);
      }


    ngOnInit() {

    // get course from search course page
    this.attService.newCourse.subscribe( course=> this.course = course)

    // get student details from search course page
    this.attService.newlistStudents.subscribe( students => this.students = students)        
    }
}