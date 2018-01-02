import { Component, Output, EventEmitter } from '@angular/core';

import { StudentsService }                 from '../../../common/services/student.service';
import { Student }                         from '../../../common/models/student';
import { DeleteId }                        from '../../../common/models/deleteid';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { ListStudents }                    from 'app/common/models/liststudents';
import { Input }                           from '@angular/core/src/metadata/directives';

@Component({
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.css']
})

export class StudentsListPage {
  Student: any;
  

  private studentsService: StudentsService;
  private students: Student[];
  private liststudents : ListStudents[] ;
  private addStudentForm  : FormGroup;


  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllStudents : FormGroup ; 
  editStudentForm: boolean = false;
  isNewForm: boolean;
  newStudent: any = {} ;

  students_first_name    : string;
  students_last_name     : string;
  students_date_of_birth : string;
  students_home_address  : string;
  students_gender        : boolean;
  
  constructor(private ss: StudentsService,private formBuilder: FormBuilder) {
    this.studentsService = ss;
  
    this.addStudentForm = formBuilder.group({
      students_first_name    : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_last_name     : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      students_date_of_birth : [''],
      students_home_address  : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      students_gender        : [''],
    });
    this.ListAllStudents = new FormGroup({
      liststudents: new FormControl()
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

  listAllStudents() {
    this.ss.listAllStudents().subscribe(res => {
      this.liststudents  = res.item;
      console.log(res.item);
    });
  }

  deleteStudent(deleteid : DeleteId){
    console.log('delete id: ',deleteid);
    alert('Do you want to remove this student?');
    
    this.ss.deleteStudent(deleteid).subscribe(res=>console.log(res))
    if ( deleteid.id !== -1){
    this.liststudents.splice(deleteid.id, 1);
    }
  } 

  ngOnInit(): void {
    //this.getStudents();
    this.listAllStudents();
  }
  
  deleteValidation(value : boolean){
    this.validateDelete = value;
  }
  
  delete(){
    this.validateDelete = false;
    this.deleteUserEvent.emit(this.Student);
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
