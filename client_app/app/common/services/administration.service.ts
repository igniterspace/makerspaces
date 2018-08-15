import { Injectable }      from '@angular/core';
import { Headers, Http, Response }   from '@angular/http';
import { AuthHttp }        from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

// check everything below this
import { Student }         from '../models/student';
import { ContextService }  from './context.service';
import { environment }     from '../../../environments/environment';
import { Guardian }        from 'app/common/models/guardian';
import { ListStudents }    from 'app/common/models/liststudents';
import { ListGuardians }   from 'app/common/models/listguardians';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';

// check everything below this
@Injectable()
export class AdministrationService {
  pItems: any;
  s : number ;
  options : any;
  authService : any ;

  private headers = new Headers({'Content-Type': 'application/json'});
  private administrationUrl;  // URL to web api


  private firstName = new BehaviorSubject<any>(null);
  fName = this.firstName.asObservable();

  public lastName  = new BehaviorSubject<any>(null);
  lName = this.lastName.asObservable();
  
  public email  = new BehaviorSubject<any>(null);
  em = this.email.asObservable();


  public uUsers  = new BehaviorSubject<any>(null);
  newitems = this.uUsers.asObservable();
  

  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.administrationUrl = environment.apiUrl + '/api/location/' + locationId + '/administration' ;
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




  listAllUsers(){
    return this.http.get('http://localhost:8080/api/users/getallusers').map(res=>res.json());
  }
  

  saveUsers(users) {
    return this.http.post('http://localhost:8080/api/users/addusers', users).map(res => res.json());
  }


  editUsers(edusers) {
    console.log("edit function in service")
    return this.http.post('http://localhost:8080/api/users/editusers', edusers).map(res => res.json());
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
    //console.log(this.pItems);
  }
}


export class ContextGuardian {
  private location: number;

constructor(private http: Http, private authHttp: AuthHttp) {
  this.location = parseInt(window['guardianId']);
  }
}

