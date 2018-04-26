import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Input }                           from '@angular/core/src/metadata/directives';

import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { StudentsService }                 from '../../../common/services/student.service';
import { ContextService }           from '../../../common/services/context.service';
import { AuthService }              from '../../../common/services/auth.service';

import { Student }                         from '../../../common/models/student';
import { DeleteId }                        from '../../../common/models/deleteid';
import { ListStudents }                    from 'app/common/models/liststudents';


@Component({
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.css']
})

export class StudentsListPage {
  Student: any;
  

  private studentsService : StudentsService;
  private students        : Student[];
  private liststudents    = [] ;
  private addStudentForm  : FormGroup;
  private updatestudents  : ListStudents;
  private student         : ListStudents[];
  private studentID       : number;
  currentLocationId :number;
  private location = {};
  private locationId: number;

  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete  : boolean;

  ListAllStudents : FormGroup ; 
  
  constructor(private ss : StudentsService,
              private formBuilder: FormBuilder,
              private context: ContextService,
              private auth  : AuthService) {
    this.studentsService = ss;
    this.ListAllStudents = new FormGroup({
         liststudents    : new FormControl()
    });
  }

//Update (edit) student details..
  viewStudent(updatestudents) {
    this.ss.updateStudent(updatestudents);
}

//Get student details from the database and show on the list in the fronend..
  listAllStudents(currentLocationId) {
    this.ss.listAllStudents(currentLocationId).subscribe(res => {
      this.liststudents  = res.item;
    });
  }

//Delete student from the database when the delete button is clicked..  
  deleteStudent(deleteid : DeleteId){
    alert('Do you want to remove this student?');
    this.ss.deleteStudent(deleteid).subscribe(res=>console.log(""))
    var i;
    for ( i=0; i<this.liststudents.length; i++){
      if(this.liststudents[i].id == deleteid){
        this.liststudents.splice(i, 1);
      }
    }
  } 
 
 ngOnInit(): void {

//Get current location ID
this.currentLocationId = this.context.getCurrentLocationId();

//Show student details in the list..
  this.listAllStudents(this.currentLocationId);

//Send student details from the list to update.page..  
  this.ss.newitems.subscribe( updatestudents => this.updatestudents = updatestudents)
 
  }

}
