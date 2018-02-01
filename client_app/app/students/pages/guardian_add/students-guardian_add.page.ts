import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { StudentsService } from '../../../common/services/student.service';

import { Guardian } from '../../../common/models/guardian';
import { ListGuardians } from '../../../common/models/listguardians';

import 'rxjs';


@Component({
  templateUrl: './students-guardian_add.page.html',
  styleUrls: ['./students-guardian_add.page.css']
})

export class StudentsGuardian_addPage {
  StudentsService: any;

  private studentsService: StudentsService;
  private guardian: Guardian[];
  private addGuardianForm: FormGroup;
  private listguardians: ListGuardians[];
  private email: Guardian[];
  emailExists: boolean;
  alive: any;
  suggestUsername: any;
  ValidateEmailNotTaken: any;

  post: any;

  gname: string;
  mnumber: number;
  hnumber: number;
  eaddress: string;


  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private ss: StudentsService,
    private formBuilder: FormBuilder,
    private http: Http) {
    this.studentsService = ss;

    this.addGuardianForm = formBuilder.group({
      gname     : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      mnumber   : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      hnumber   : [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'eaddress': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern),]),
    });
  }



  // getEmails() {
  //   this.ss.getEmail().subscribe(res => {
  //     this.email = res.item;
  //     console.log(res.item);
  //   });
  // }
  
  public checkEmailExists() {
    const email = this.addGuardianForm.controls['eaddress'].value.toLowerCase();
    this.ss.checkIfUserExists(true, false, email).takeWhile(() => this.alive).subscribe(res => {

      console.log(res);
      if (res.item[0].isValid === true) {
        this.emailExists = true;
      }
      
      else {
        //this.suggestUsername(this.addGuardianForm.controls['eaddress'].value.split('@')[0]);
        this.emailExists = false;
      }
    });
   
  }

  isValid(field: string) {
    let formField = this.addGuardianForm.get(field);
    return formField.valid || formField.pristine;
  }
  

  saveGuardian(guardian: Guardian) {
    this.ss.saveGuardian(guardian).subscribe(res => console.log(guardian));
    this.addGuardianForm.reset();
  }
  
  ngOnInit(): void {
    
        // this.getEmails();
    
        // this.addGuardianForm = this.ss.group({
        //   name: ['', Validators.required],
        //   email: ['',[Validators.required, Validators.email],
        //   this.validateEmailNotTaken.bind(this)
        //   ]
        // });
      }

      // validateEmailNotTaken(control: AbstractControl) {
      //   return this.StudentsService.checkEmailNotTaken(control.value).map(res => {
      //     return res ? null : { emailTaken: true };
      //   });
      // }
}