import { Component , OnInit } from '@angular/core';
import { StudentsService }      from '../../../common/services/student.service';
import { Student }      from '../../../common/models/student';
import { ListGuardians } from '../../../common/models/listguardians';
import { FormGroup , FormControl, FormBuilder, ReactiveFormsModule ,Validators, FormsModule } from '@angular/forms';
import { Http, Response }       from '@angular/http';
import { Guardian }             from '../../../common/models/guardian';

@Component({
  templateUrl: './students-guardian.page.html',
  styleUrls: ['./students-guardian.page.css']
})

export class StudentsGuardianPage {

  private studentsService: StudentsService;
  private students: Student[];
  private listguardians : ListGuardians[] ;
  private guardian: Guardian[];

  ListallGuardians : FormGroup ;
  
  post: any ;
  
  gname   : string;
  mnumber : number;
  hnumber : number;
  eaddress: string;

  guardians_id    : number ;
  guardians_name  : string ;

  constructor(private ss: StudentsService,
              private formBuilder: FormBuilder,
              private http: Http){          
    this.studentsService  = ss;
    // this.ListallGuardians = formBuilder.group({
    //   gname   :  [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    //   mnumber :  [null, Validators.compose([Validators.required, Validators.minLength(10)])],
    //   hnumber :  [null, Validators.compose([Validators.required, Validators.minLength(10)])],
    //   eaddress:  [''],
    // });
    this.ListallGuardians = new FormGroup({
    listguardians: new FormControl()
  });
    
  }

  
  getStudents(): void {
    
  }

  listAllGuardians() {
    this.ss.listAllGuardians().subscribe(res => {
      this.listguardians  = res.item;
      console.log(res.item);
    });
  }

  saveGuardian(guardian:Guardian) {
    this.ss.saveGuardian(guardian).subscribe(res => console.log(guardian));
     }

  ngOnInit(): void {
    this.getStudents();
    this.listAllGuardians();
  }
}
