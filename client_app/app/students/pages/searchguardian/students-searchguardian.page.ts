import { Component, Output, EventEmitter } from '@angular/core';
import { Input }                           from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { StudentsService }                 from '../../../common/services/student.service';

import { Student }                         from '../../../common/models/student';
import { DeleteId }                        from '../../../common/models/deleteid';
import { ListStudents }                    from 'app/common/models/liststudents';


@Component({
  templateUrl: './students-searchguardian.page.html',
  styleUrls: ['./students-searchguardian.page.css']
})

export class SearchedGuardianPage {
  Student: any;
  

  private studentsService: StudentsService;
  private students: Student[];
  private liststudents = [] ;
  //private addStudentForm  : FormGroup;
  private updatestudents: ListStudents[];

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;
  ListAllStudents : FormGroup ; 
  

  students_first_name    : string;
  students_last_name     : string;
  students_date_of_birth : string;
  students_home_address  : string;
  students_gender        : boolean;
  
  constructor(private ss: StudentsService,private formBuilder: FormBuilder) {
    this.studentsService = ss;
    this.ListAllStudents = new FormGroup({
      liststudents: new FormControl()
    });
  }


  listAllStudents() {
    this.ss.listAllStudents().subscribe(res => {
      this.liststudents  = res.item;
      console.log(this.liststudents[0].id);
      console.log(res.item);
    });
  }

  
  ngOnInit(): void {
this.listAllStudents();
  }

}
