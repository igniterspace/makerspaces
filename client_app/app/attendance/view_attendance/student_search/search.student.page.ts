import { Component, OnInit }  from '@angular/core';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

//Service
import { AttendanceService }  from '../../../common/services/attendance.service';


@Component({
    templateUrl     : './search.student.page.html',
    styleUrls       : ['./search.student.page.css']

})

export class SearchStudentPage implements OnInit {
    
  private student_results    : any[];
  private student_attendance : any[];
  private seachresultForm    : boolean;
  private attendanceResultForm: boolean;

    constructor( private attService : AttendanceService){}

    // send search string and get all students relate to search string
    searchCourseStudents(search) {
      this.attService.searchCourseStudents(search).subscribe(res => {
        this.student_results = res.item;
        console.log("hey results here =",this.student_results);
        // show result table
        this.seachresultForm = true ;
    });
  }

  //get student lesson attendance details
  getLessonAttendanceDetails(student_course){
    this.attService.getLessonAttendanceDetails(student_course).subscribe(res => {
      this.student_attendance = res.item;
      console.log("att results here =",this.student_attendance);
      // show attendance result table
      this.seachresultForm = false ;
      this.attendanceResultForm = true ;
  });
  }


    ngOnInit(){

    }

}

