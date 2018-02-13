import { Component , OnInit }   from '@angular/core';

import { Http, Response }       from '@angular/http';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';

import { StudentsService }      from '../../../common/services/student.service';

import { Student }              from '../../../common/models/student';
import { ListGuardians }        from '../../../common/models/listguardians';
import { Guardian }             from '../../../common/models/guardian';

@Component({
  templateUrl: './students-guardian.page.html',
  styleUrls: ['./students-guardian.page.css']
})

export class StudentsGuardianPage implements OnInit {

  private studentsService: StudentsService;
  private ListallGuardians: FormGroup;
  private listguardians : ListGuardians;
  private guardian : number ;
  private searchguardian : number ;
  search : any;
  search_res: any;
  detailForm :boolean;

  responseDetails : any ;

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

//Show guardians in the dropdown..
  listAllGuardians() {
    this.ss.listAllGuardians().subscribe(res => {
      this.listguardians  = res.item;
      //console.log(res.item);
    });
  }

  assignGuardian(post){
    //console.log(post);
    this.guardians_name    = post.guardians_name;
  }

//Send selected guardian id from the dropdown to the student form page..  
  saveassGuardian(as_guardian: number) {
    this.guardian = as_guardian ;
    //console.log(this.guardian);
    this.ss.changeMessage(this.guardian)
    this.ss.currentMessage.subscribe(guardian => this.guardian = guardian)
  } 

//Send selected guardian id from the searched guardian list to the student form page..  
  savesearchGuardian(search_guardian: number) {
    this.searchguardian = search_guardian ;
    //console.log(this.searchguardian);
    this.ss.newMessage(this.searchguardian)
    this.ss.searchguar.subscribe(searchguardian => this.searchguardian = searchguardian)
  } 

//Get searched guardian details to show in the frontend..  
  similarGuardian(search) {
    //console.log(search);
    this.ss.similarGuardian(search).subscribe(res => {this.search_res = res.item;
    //console.log(this.search_res);
  });  
}

//show the searched guardian table after the search button is clicked..
showTable(){
  this.detailForm = true ;
}

  ngOnInit(): void {
    this.listAllGuardians();
   
  }
}
