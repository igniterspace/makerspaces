import { Component, OnInit }    from '@angular/core';
import { Student }              from '../../../common/models/student';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';
import { Router } from '@angular/router';

import { StudentsService }      from '../../../common/services/student.service';
import { ContextService }       from '../../../common/services/context.service';
import { AuthService }          from '../../../common/services/auth.service';

import { ListStudents }         from '../../../common/models/liststudents';

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
              private formBuilder: FormBuilder,
              private context: ContextService,
              private auth  : AuthService,
              public router: Router) {
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

//Get current location ID
  this.currentLocationId = this.context.getCurrentLocationId();

//Get guardian id from guardian page (dropdown)..
    this.ss.currentMessage.subscribe(guardian => this.guardian = guardian)
  }

  isValid(field: string) {
    let formField = this.addStudentForm.get(field);
    return formField.valid || formField.pristine;
  }


  //Assign guardian id to new student and send all the details to the database..
  saveStudent(student : ListStudents) { 
    var location = this.currentLocationId;
    var full_detail = Object.assign(student , this.guardian , {location});
    this.ss.saveStudent(full_detail).subscribe(res => console.log(""));
    this.addStudentForm.reset();
    alert('Student added to database successfully!');
    
    //REDIRECT TO Courses List
    this.router.navigate(['/courses/list']);
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z '-]+$")) {
      return {invalidName: true};
    }
  }

}
