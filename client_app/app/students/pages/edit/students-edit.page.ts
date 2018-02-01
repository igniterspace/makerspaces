import { Component, OnInit }    from '@angular/core';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { DpDatePickerModule }   from 'ng2-date-picker';

import { StudentsService }      from '../../../common/services/student.service';
import { ListStudents }         from '../../../common/models/liststudents';
import { Student }              from 'app/common/models/student';

@Component({
  templateUrl: './students-edit.page.html',
  styleUrls: ['./students-edit.page.css']
})

export class StudentsEditPage implements OnInit {
  [x: string]: any;

  private studentsService : StudentsService;
  private addStudentForm  : FormGroup;
  private student         : ListStudents[];
  searchguardian : number;
  post:any;
  newStudent: any = {} ;

  students_first_name    : string;
  students_last_name     : string;
  students_date_of_birth : string;
  students_home_address  : string;
  students_gender        : string;

  editStudentForm: boolean = false;
  isNewForm: boolean;

  constructor(private ss: StudentsService,
              private formBuilder: FormBuilder) {
    this.studentsService = ss;

    this.addStudentForm = formBuilder.group({
      students_first_name    : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_last_name     : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_date_of_birth : [''],
      students_home_address  : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      students_gender        : [''],
    });
  }
  

  ngOnInit() {

//Get guardian id from guardian page (dropdown)..
    this.ss.currentMessage.subscribe(guardian => this.guardian = guardian)
  }

  isValid(field : string){
    let formField = this.addStudentForm.get(field);
    return formField.valid || formField.pristine;
  }

  //Assign guardian id to new student and send all the details to the database..
  saveStudent(student : ListStudents) { 
    var full_detail = Object.assign(student , this.guardian);
    console.log(full_detail);
    this.ss.saveStudent(full_detail).subscribe(res => console.log(full_detail));
    this.addStudentForm.reset();
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z '-]+$")) {
      return {invalidName: true};
    }
  }

}
