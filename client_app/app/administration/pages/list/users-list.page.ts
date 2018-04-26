import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                                    from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { AdministrationService } from '../../../common/services/administration.service';

import { Users, UsersEdit }      from 'app/common/models/users';

import { clone }                 from 'lodash'; //for edit



@Component({
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.css']
})


//List the users with all their details

export class UsersListPage {
  User: any;
  

  private administrationService : AdministrationService;
  public Users: Users[];
  private user : UsersEdit[];
  //private addUserForm : FormGroup; WHY PUT THIS???
  private listusers = [] ;
  private userID       : number;
  //private updatestudents  : ListStudents;
  //--------private user     : ListUsers[];
  //variables for edit function
  userForm     : boolean = false;
  editUserForm : boolean = false;
  editedUser  : any = {};

//-----
  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;

  ListAllUsers : FormGroup ; 
  
  constructor(private as: AdministrationService,private formBuilder: FormBuilder) {
    this.administrationService = as;
    this.ListAllUsers = new FormGroup({
      listusers: new FormControl()
    });
  }

//Update (edit) student details..
//   viewStudent(updatestudents) {
//     this.ss.updateStudent(updatestudents);
// }

//Get student details from the database and show on the list in the fronend..
  listAllUsers() {
    this.as.listAllUsers().subscribe(res => {
      this.listusers  = res.item;
      console.log(this.listusers);
      // console.log(this.liststudents[0].id);
      // console.log(res.item);
    });
  }

  showEditUserForm(user: UsersEdit) {
    console.log("edit form",user);
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = clone(user);
  }

//Delete student from the database when the delete button is clicked..  
  // deleteStudent(deleteid : DeleteId){
  //   //console.log('delete id: ',deleteid);
  //   alert('Do you want to remove this student?');
    
  //   this.ss.deleteStudent(deleteid).subscribe(res=>console.log(res))
  //   var i;
  //   // console.log(this.liststudents[0].id);
  //   // console.log(this.liststudents.length);

  //   for ( i=0; i<this.liststudents.length; i++){
  //     //console.log(this.liststudents[i].id+' '+i+' '+deleteid);
  //     if(this.liststudents[i].id == deleteid){
  //       //console.log("del index:",i)
  //       this.liststudents.splice(i, 1);
  //     }
  //   }
  // } 
 
 ngOnInit(): void {

//Show user details in the list..
  this.listAllUsers();
  

//Send student details from the list to update.page..  
  // this.as.newitems.subscribe( updatestudents => this.updatestudents = updatestudents)
 
}

}
