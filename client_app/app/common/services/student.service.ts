import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { AuthHttp }       from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Student }        from '../models/student';
import { ContextService } from './context.service';
import { environment }    from '../../../environments/environment';
import { Guardian }       from 'app/common/models/guardian';
import { ListStudents } from 'app/common/models/liststudents';


@Injectable()
export class StudentsService {
  pItems: any;
  s : number ;
 
  private headers = new Headers({'Content-Type': 'application/json'});
  private studentsUrl;  // URL to web api
  
  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.studentsUrl = environment.apiUrl + '/api/location/' + locationId + '/students' ;
  }
  fetchData() {
    this.http.get('./components/students/pages/edit/students-guardian_add-page.html').map(
     (response) => response.json()
    ).subscribe (
      (data) => console.log(data)
    )
  }

  getCurrentLocation(): any {
    let url = environment.apiUrl + '/api/students/test';
    return this.authHttp.get(url)
        .toPromise()
        .then(response => {
            console.log(response.json().items);
            return response.json().items || {};
        })
        .catch(this.handleError);
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

  saveStudent(product) {
    return this.http.post('http://localhost:8080/api/students/addStudent', product).map(res => res.json());
  }

  saveGuardian(guardian) {
    return this.http.post('http://localhost:8080/api/students/addGuardian', guardian).map(res => res.json());
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

