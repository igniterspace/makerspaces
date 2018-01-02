import { Component }            from '@angular/core';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { DpDatePickerModule }   from 'ng2-date-picker';

import { StudentsService }      from '../../../common/services/student.service';
import { ListStudents }         from '../../../common/models/liststudents';
import { Student } from 'app/common/models/student';

@Component({
  templateUrl: './students-edit.page.html',
  styleUrls: ['./students-edit.page.css']
})

export class StudentsEditPage {
  [x: string]: any;

  private studentsService : StudentsService;
  private addStudentForm  : FormGroup;
  private student         : ListStudents[];
  
  post:any;
  newStudent: any = {} ;

  students_first_name    : string;
  students_last_name     : string;
  students_date_of_birth : string;
  students_home_address  : string;
  students_gender        : boolean;

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

  getStudents(post) {
    console.log(post);
    this.students_first_name    = post.students_first_name;
    this.students_last_name     = post.students_last_name;
    this.students_date_of_birth = post.students_date_of_birth;
    this.students_home_address  = post.students_home_address;
    this.students_gender        = post.students_gender;

  }

  ngOnInit(): void {
    
  }

  isValid(field : string){
    let formField = this.addStudentForm.get(field);
    return formField.valid || formField.pristine;
  }

  saveStudent(product:ListStudents) {
 this.ss.saveStudent(product).subscribe(res => console.log(product));
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z '-]+$")) {
      return {invalidName: true};
    }
  }
  editStudent(student: Student){
    if(!student){
   this.editStudentForm = false;
   return;
    }
    this.editStudentForm = true;
    this.isNewForm = false;
    this.newStudent = student;
  }

}
