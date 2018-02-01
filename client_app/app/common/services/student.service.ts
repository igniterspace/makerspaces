import { Injectable }      from '@angular/core';
import { Headers, Http, Response }   from '@angular/http';
import { AuthHttp }        from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { Student }         from '../models/student';
import { ContextService }  from './context.service';
import { environment }     from '../../../environments/environment';
import { Guardian }        from 'app/common/models/guardian';
import { ListStudents }    from 'app/common/models/liststudents';
import { ListGuardians }   from 'app/common/models/listguardians';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';


@Injectable()
export class StudentsService {
  pItems: any;
  s : number ;
  options : any;
  authService : any ;

  private headers = new Headers({'Content-Type': 'application/json'});
  private studentsUrl;  // URL to web api


  private guardianID = new BehaviorSubject<any>(null);
  currentMessage = this.guardianID.asObservable();

  public uStudent  = new BehaviorSubject<any>(null);
  newitems = this.uStudent.asObservable();
  
  public sGuardian  = new BehaviorSubject<any>(null);
  searchguar = this.sGuardian.asObservable();

  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.studentsUrl = environment.apiUrl + '/api/location/' + locationId + '/students' ;
  }


  newMessage(guardian: any) {
    this.sGuardian.next(guardian)
  }

  changeMessage(guardian: any) {
    this.guardianID.next(guardian)
  }

  updateStudent(updatestudents:any) {
    this.uStudent.next(updatestudents)
  }

  getAuthService(params): Observable<any> {
    return this.http.get(`${this.authService}${params}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error Authentication Service'));
  }

  fetchData() {
    this.http.get('./components/students/pages/edit/students-guardian_add-page.html').map(
     (response) => response.json()
    ).subscribe (
      (data) => console.log(data)
    )
  }


  listAllGuardians(){
    return this.http.get('http://localhost:8080/api/students/getallguardians').map(res=>res.json());
  }

  listAllStudents(){
    return this.http.get('http://localhost:8080/api/students/getallstudents').map(res=>res.json());
  }

  deleteStudent(deleteid){
    return this.http.get(`http://localhost:8080/api/students/deleteStudent/${deleteid}`).map(res=>res.json());
  }

  saveStudent(full_detail) {
    return this.http.post('http://localhost:8080/api/students/addStudent', full_detail).map(res => res.json());
  }

  saveGuardian(guardian) {
    return this.http.post('http://localhost:8080/api/students/addGuardian', guardian).map(res => res.json());
  }

  editStudent(edstudents) {
    return this.http.post('http://localhost:8080/api/students/updateStudent', edstudents).map(res => res.json());
  }

  similarGuardian(search) {
    console.log(search);
    return this.http.get('http://localhost:8080/api/students/search/'+ search).map(res => res.json());
  }



checkIfUserExists(isEmail: boolean, isUsername: boolean, value: string) {
  return this.http.get(`http://localhost:8080/api/students/checkIfUserExists?isEmail=${isEmail}&value=${value}`).map(res => res.json());
}  


private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
  
addProduct(product:ListStudents){
    this.pItems.push(product);
    console.log(this.pItems);
  }
}


export class ContextGuardian {
  private location: number;

constructor(private http: Http, private authHttp: AuthHttp) {
  this.location = parseInt(window['guardianId']);
  }
}

