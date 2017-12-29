import { Component }            from '@angular/core';
import { StudentsService }      from '../../../common/services/student.service';
import { Guardian }             from '../../../common/models/guardian';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

@Component({
  templateUrl: './students-guardian_add.page.html',
  styleUrls: ['./students-guardian_add.page.css']
})

export class StudentsGuardian_addPage {

  private studentsService: StudentsService;
  private guardian: Guardian[];
  private addGuardianForm: FormGroup;

  post: any;

gname: string;
mnumber: number;
hnumber: number;
eaddress: string;

  constructor(private os: StudentsService,
              private formBuilder: FormBuilder) {
    this.studentsService = os;

    this.addGuardianForm = formBuilder.group({
      gname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      mnumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      hnumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      eaddress: [''],

  });
              }
   getGuardians(post){
    // this.studentsService.getStudents().then(students => this.students = students);
     console.log(post);
    this.gname = post.gname;
     this.mnumber = post.mnumber;
    this.hnumber = post.hnumber;
    this.eaddress = post.eaddress;

   }

  ngOnInit(): void {

  }
   isValid(field: string) {
     let formField = this.addGuardianForm.get(field);
     return formField.valid || formField.pristine;
   }
}
