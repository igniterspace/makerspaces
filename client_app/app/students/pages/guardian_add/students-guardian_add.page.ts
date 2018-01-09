import { Component, OnInit }    from '@angular/core';

import { Http, Response }       from '@angular/http';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { StudentsService }      from '../../../common/services/student.service';

import { Guardian }             from '../../../common/models/guardian';
import { ListGuardians } from '../../../common/models/listguardians';


@Component({
  templateUrl: './students-guardian_add.page.html',
  styleUrls: ['./students-guardian_add.page.css']
})

export class StudentsGuardian_addPage {

  private studentsService: StudentsService;
  private guardian: Guardian[];
  private addGuardianForm: FormGroup;
  private listguardians : ListGuardians[] ;

  post:any;

  gname   : string;
  mnumber : number;
  hnumber : number;
  eaddress: string;

  constructor(private ss: StudentsService,
              private formBuilder: FormBuilder,
              private http: Http) {
    this.studentsService = ss;
  
    this.addGuardianForm = formBuilder.group({
      gname   :  [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      mnumber :  [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      hnumber :  [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      eaddress:  [''],
  });
}
   
  ngOnInit(): void {
    this.listAllGuardians();
  }
   
  isValid(field : string) {
     let formField = this.addGuardianForm.get(field);
     return formField.valid || formField.pristine;
  }

   listAllGuardians() {
    this.ss.listAllGuardians().subscribe(res => {
      this.listguardians  = res.item;
      console.log(res.item);
    });
  }

   saveGuardian(guardian:Guardian) {
    this.ss.saveGuardian(guardian).subscribe(res => console.log(guardian));
    this.addGuardianForm.reset();
  }

}
