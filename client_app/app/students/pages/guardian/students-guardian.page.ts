import { Component , OnInit } from '@angular/core';

import { Http, Response }       from '@angular/http';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { StudentsService }      from '../../../common/services/student.service';

import { Student }      from '../../../common/models/student';
import { ListGuardians } from '../../../common/models/listguardians';
import { Guardian }             from '../../../common/models/guardian';

@Component({
  templateUrl: './students-guardian.page.html',
  styleUrls: ['./students-guardian.page.css']
})

export class StudentsGuardianPage {

  private studentsService: StudentsService;
  private ListallGuardians: FormGroup;
  private listguardians : ListGuardians;
  private guardian : number ;
  
  post: any ;
  
  guardians_id    : number ;
  guardians_name  : number ;

  constructor(private ss: StudentsService,
              private formBuilder: FormBuilder,
              private http: Http){          
    this.studentsService  = ss;
  
    this.ListallGuardians = formBuilder.group({
    guardians_name:  [''],
  });
    
  }


  listAllGuardians() {
    this.ss.listAllGuardians().subscribe(res => {
      this.listguardians  = res.item;
      console.log(res.item);
    });
  }

  assignGuardian(post){
    console.log(post);
    this.guardians_name    = post.guardians_name;
  }

  saveassGuardian(as_guardian: number) {
    this.guardian = as_guardian ;
    console.log(this.guardian);
    this.ss.changeMessage(this.guardian)
    this.ss.currentMessage.subscribe(guardian => this.guardian = guardian)
  } 

  ngOnInit(): void {
    this.listAllGuardians();
  }
}
