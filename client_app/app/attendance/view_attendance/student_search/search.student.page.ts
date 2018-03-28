import { Component, OnInit }  from '@angular/core';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

//Service
import { AttendanceService }  from '../../../common/services/attendance.service';
import { ContextService }     from '../../../common/services/context.service';

@Component({
    templateUrl     : './search.student.page.html',
    styleUrls       : ['./search.student.page.css']

})

export class SearchStudentPage implements OnInit {
    
  private student_results    : any[];
  private student_attendance : any[];
  private seachresultForm    : boolean;
  private attendanceResultForm: boolean;
  private course_id          : number;

    constructor( private attService : AttendanceService,
                 private context    : ContextService   ){}

    // send search string and get all students relate to search string
    searchCourseStudents(search) {
      this.attService.searchCourseStudents(search).subscribe(res => {
        this.student_results = res.item;
        // show result table
        this.seachresultForm = true ;
        this.attendanceResultForm = false ;
    });
  }

  //get student lesson attendance details
  getLessonAttendanceDetails(student_course){
    this.attService.getLessonAttendanceDetails(student_course).subscribe(res => {
      this.student_attendance = res.item;

      this.course_id  = student_course.course_id;
      // show attendance result table
      this.seachresultForm = false ;
      this.attendanceResultForm = true ;
  });
  }

  //mark student as present
  markStudentAttendance(lesson){
    this.attService.markStudentLessonAttendance(lesson).subscribe(res => {

      lesson.attendance_mark = 1 ;
    });
    
  }

  //edit student attendance by lesson
  editlessonAttendance(lesson){ 
    this.attService.editlessonAttendance(lesson).subscribe( res => {
      console.log("Success");

      lesson.attendance_mark = 0 ;
 })
}

    ngOnInit(){
      
    }

}

