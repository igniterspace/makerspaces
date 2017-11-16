import { Component } from '@angular/core';
import { StudentsService }      from '../../../common/services/student.service';
import { Student }      from '../../../common/models/student';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';



@Component({
  templateUrl: './students-edit.page.html',
  styleUrls: ['./students-edit.page.css']
})

export class StudentsEditPage {
  [x: string]: any;

  private studentsService: StudentsService;
  private students: Student[];
  private addStudentForm: FormGroup;

  post:any;

  firstname: string;
  lastname:string;
  bday:string;
  bmonth:string;
  byear:string;
  address:string;

  constructor(private os: StudentsService,
              private formBuilder: FormBuilder) {
    this.studentsService = os;

    this.addStudentForm = formBuilder.group({
      firstname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      lastname:[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      bday:[''],
      bmonth:[''],
      byear:[''],
      address:[null, Validators.compose([Validators.required, Validators.minLength(10)])],
      // gender:['']


    });
  }

  getStudents(post) {
    //this.studentsService.getStudents().then(students => this.students = students);
    console.log(post);
    this.firstname = post.firstname;
    this.lastname = post.lastname;
    this.bday = post.bday;
    this.bmonth = post.bday;
    this.byear = post.byear;
    this.address = post.address;

  }

  ngOnInit(): void {
    // this.getStudents();
  }

  isValid(field : string){
    let formField = this.addStudentForm.get(field);
    return formField.valid || formField.pristine;
  }

  saveProduct(product:Student) {
    if(this.isNewForm) {
   this.studentsService.addProduct(product);
    }else{

    }this.productForm = false;
  }
  // nameValidator(control: FormControl): {[s: string]: boolean} {
  //   if (!control.value.match("^[a-zA-Z '-]+$")) {
  //     return {invalidName: true};
  //   }
  // }
}
