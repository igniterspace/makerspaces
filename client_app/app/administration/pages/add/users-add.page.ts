import { Component, OnInit }    from '@angular/core';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { DpDatePickerModule }   from 'ng2-date-picker';


import { AdministrationService } from '../../../common/services/administration.service';
import { Users } from 'app/common/models/users'; //---


@Component({
  templateUrl: './users-add.page.html',
  styleUrls  : ['./users-add.page.css']
})



export class UsersAddPage {
  [x: string]: any;

  private administrationService : AdministrationService;
  private addUserForm  : FormGroup;
  public  Users         : Users[];
  //public Users         : AddUsers[];
  
  user : any;
  post:any;
  

  constructor(private as: AdministrationService,
              private formBuilder: FormBuilder) {
    this.administrationService = as;

    this.addUserForm = formBuilder.group({
      users_first_name    : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      users_last_name    : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      users_email       : [''],
      profile_image         : ['']
    });
  }
 

  isValid(field : string){
    let formField = this.addUserForm.get(field);
    return formField.valid || formField.pristine;
  }


  //Send User details to the database..
  saveUsers(users : Users) {
     console.log("asdfgh=",users);
     //-- error ---
     this.as.saveUsers(users).subscribe(res =>  console.log(users));
     //-- error ---
     this.addUserForm.reset();
  }

  //DELETE BETWEEN THIS AFTER DONE
  
  //------------




}
