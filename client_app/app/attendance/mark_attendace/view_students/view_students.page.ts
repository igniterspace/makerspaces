import { Component , OnInit}  from '@angular/core';
//Models
import { Course }        from '../../../common/models/courses';
// services
import { AttendanceService }  from '../../../common/services/attendance.service';
import { AttDetails }         from '../../../common/models/attendance.model';

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
    //--
    public att = new AttDetails();    


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

      //this is to check if attendance for a student of a particular course on a particular day is marked or not
    attendanceMarked(){
        //put script to check in databse with date and see if attendance is marked or not
        //put an if statement and check with date , course, student in database and show true for those students who are in database by using true
       // return true;
    }

    //this is to mark the student attendance when the button is pressed
    markStudentAttendance(courseId, studentId){


        this.att.student_id =studentId;
        this.att.course_id = courseId;
        this.att.att_date = this.getCurrentDate();

        //check this code

        this.attService.markStudentAttendance(this.att).subscribe( res => {
            console.log("Success");
            alert("Attendance for today's class marked!");
            //this.attendanceMarked();
        });
        //this.attendanceMarked();
        

    }

    getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        //assign to new variable of type string
        var d; 
        var m;

        if(dd<10) {
            d= '0'+dd;
        }else{
            d=dd;
        }

        if(mm<10) {
            m = '0'+ mm;
        } else{
            m=mm;
        }
        return (m + '-' + d + '-' + yyyy);
    }


    ngOnInit() {

    // get course from search course page
    this.attService.newCourse.subscribe( course=> this.course = course)

    // get student details from search course page
    this.attService.newlistStudents.subscribe( students => this.students = students)        
    }
}