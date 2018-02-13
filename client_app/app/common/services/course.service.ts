import { Injectable }      from '@angular/core';
import { Headers, Http, Response }   from '@angular/http';
import { AuthHttp }        from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

//import { Student }         from '../models/student';
import { ContextService }  from './context.service';
import { environment }     from '../../../environments/environment';
// import { Guardian }        from 'app/common/models/guardian';
// import { ListStudents }    from 'app/common/models/liststudents';
// import { ListGuardians }   from 'app/common/models/listguardians';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';


@Injectable()
export class CoursesService {
  pItems: any;
  s : number ;
  options : any;
  authService : any ;

  private headers = new Headers({'Content-Type': 'application/json'});
  private studentsUrl;  // URL to web api

  public sCourse  = new BehaviorSubject<any>(null);
  selectcourse = this.sCourse.asObservable();

  public sLesson  = new BehaviorSubject<any>(null);
  selectlesson = this.sLesson.asObservable();

  public cStudent  = new BehaviorSubject<any>(null);
  selectstudent = this.cStudent.asObservable();

  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.studentsUrl = environment.apiUrl + '/api/location/' + locationId + '/students' ;
  }

  selstudent(selectstu: any) {
    console.log(selectstu);
    this.cStudent.next(selectstu)
  } 

  newMessage(selectcour: any) {
    console.log(selectcour);
    this.sCourse.next(selectcour)
  }

  sellesson(selectles: any) {
    console.log(selectles);
    this.sCourse.next(selectles)
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


  listAllCourses(){
    return this.http.get('http://localhost:8080/api/courses/getallcourses').map(res=>res.json());
  }

  listAllLessons(){
    return this.http.get('http://localhost:8080/api/courses/getalllessons').map(res=>res.json());
  }

  // getStudents(c_Id){
  //   return this.http.get(`http://localhost:8080/api/courses/getallcoursestudents/${c_Id}`).map(res=>res.json());
  // }

  getStudents(){
    return this.http.get('http://localhost:8080/api/courses/getallcoursestudents').map(res=>res.json());
  }

  saveCourse(course_details) {
    return this.http.post('http://localhost:8080/api/courses/addcourse', course_details).map(res => res.json());
  }

  saveLesson(lesson_details) {
    return this.http.post('http://localhost:8080/api/courses/addlesson', lesson_details).map(res => res.json());
  }

 


private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
  
// addProduct(product:ListStudents){
//     this.pItems.push(product);
//     console.log(this.pItems);
//   }
// }


// export class ContextGuardian {
//   private location: number;

// constructor(private http: Http, private authHttp: AuthHttp) {
//   this.location = parseInt(window['guardianId']);
//   }
 }

