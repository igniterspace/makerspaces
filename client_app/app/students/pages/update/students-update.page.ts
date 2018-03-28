import { Component, OnInit  }   from '@angular/core';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { DpDatePickerModule }   from 'ng2-date-picker';
import 'rxjs';

import { StudentsService }      from '../../../common/services/student.service';
import { ListStudents }         from '../../../common/models/liststudents';
import { Student }              from 'app/common/models/student';
import { updateLocale }         from 'moment';

@Component({
  templateUrl: './students-update.page.html', 
  styleUrls: ['./students-update.page.css'],
})

export class StudentsUpdatePage {
  [x: string]: any;

  private studentsService : StudentsService;
  private student         : ListStudents;
  private newitems        : any ;
  private updareStudentForm : any ;
  private fname : any;
  private lname : any;
  private student_data : any;

  post:any;
  newStudent: any = {} ;

  students_id            : number;
  students_first_name    : string;
  students_last_name     : string;
  students_date_of_birth : string;
  students_home_address  : string;
  students_gender        : string;
  students_g_id          : number;

  editStudentForm: boolean = false;
  isNewForm: boolean;


  updateStudentForm = new FormGroup({
    students_id            :  new FormControl(this.students_id),
    students_first_name    :  new FormControl(this.students_first_name),
    students_last_name     :  new FormControl(this.students_last_name),
    students_date_of_birth :  new FormControl(this.students_date_of_birth),
    students_home_address  :  new FormControl(this.students_home_address),
    students_gender        :  new FormControl(this.students_gender),
    students_g_id          :  new FormControl(this.students_g_id)
}); 

   
  constructor(private ss: StudentsService,
              private formBuilder: FormBuilder) {
    this.studentsService = ss;

    this.updateStudentForm = formBuilder.group({
      students_id            : [''],
      students_first_name    : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_last_name     : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_date_of_birth : [''],
      students_home_address  : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      students_gender        : [''],
      students_g_id          : ['']
      });
  }
  
//Send updated (edited) student details to the database..
  updateStudent(student_data : ListStudents) { 
    var edstudents = Object.assign(student_data , this.guardian);
    this.ss.editStudent(edstudents).subscribe(res => console.log(edstudents));
    this.updateStudentForm.reset();
    alert('This student has being updated..');
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z '-]+$")) {
      return {invalidName: true};
    }
  }

  ngOnInit() {
   
//Show details recieved from the list in the form..
    this.ss.uStudent.subscribe( updatestudents => {
      let student_name = updatestudents.students_name;
      let name = student_name.split(" ");
      this.lname = name[1];
      this.fname = name[0];
     
      this.student_data = updatestudents;

      this.updateStudentForm.patchValue({
        students_id              : updatestudents.id,
        students_first_name      : name[0],
        students_last_name       : name[1],
        students_date_of_birth   : updatestudents.date_of_birth,
        students_home_address    : updatestudents.home_address,
        students_gender          : updatestudents.gender,
        students_g_id            : updatestudents.g_id
      });
    })   
  }
}
