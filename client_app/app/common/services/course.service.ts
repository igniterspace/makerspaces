import { Injectable }                from '@angular/core';
import { Headers, Http, Response }   from '@angular/http';
import { AuthHttp }                  from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { ContextService }  from './context.service';
import { environment }     from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';

import { DELETE_LESSON }    from '../../courses/pages/lesson_list/courseslessons.data';
import { DeleteLId }        from '../models/courses';

@Injectable()
export class CoursesService {
  pItems: any;
  s : number ;
  options : any;
  authService : any ;
  res : any ;

  private headers = new Headers({'Content-Type': 'application/json'});
  private studentsUrl;  // URL to web api

  public sLesson  = new BehaviorSubject<any>(null);
  selectlesson = this.sLesson.asObservable();

  public uLesson  = new BehaviorSubject<any>(null);
  updatelesson = this.uLesson.asObservable();

  public sStudent  = new BehaviorSubject<any>(null);
  selectstudent = this.sStudent.asObservable();

  public uCourse  = new BehaviorSubject<any>(null);
  selectcourse = this.uCourse.asObservable();

  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.studentsUrl = environment.apiUrl + '/api/location/' + locationId + '/students' ;
  }

  selStudent(courses_id) {
    this.sStudent.next(courses_id)
  }

  sellesson(courses_id) {
    this.sLesson.next(courses_id)
  }

  updateCourse(updatecourses:any) {
    this.uCourse.next(updatecourses)
  }

  editLesson(updatelessons:any) {
    this.uLesson.next(updatelessons)
  }

  getAuthService(params): Observable<any> {
    return this.http.get(`${this.authService}${params}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error Authentication Service'));
  }


  listAllCourses(currentLocationId){
    return this.http.get('http://localhost:8080/api/courses/getallcourses/' + currentLocationId).map(res=>res.json());
  }

  getCourseID(courses_id){
    return this.http.get('http://localhost:8080/api/courses/getcourseid/'+ courses_id).map(res=>res.json());
  }

  getStudents(courses_id){
    return this.http.get('http://localhost:8080/api/courses/getallcoursestudents/'+ courses_id).map(res=>res.json());
  }

  getlessons(c_id){
    return this.http.get('http://localhost:8080/api/courses/getallcourselessons/' +c_id).map(res=>res.json());
  }

  listAllStudents(){
    return this.http.get('http://localhost:8080/api/courses/listallstudents').map(res=>res.json());
  }

  listAllLessons(){
    return this.http.get('http://localhost:8080/api/courses/listalllessons').map(res=>res.json());
  }

  saveCourse(course_details) {
    return this.http.post('http://localhost:8080/api/courses/addcourse', course_details).map(res => res.json());
  }

  saveLesson(full_detail) {
       return this.http.post('http://localhost:8080/api/courses/addlesson', full_detail).map(res => res.json());
  }

  saveCourseLesson(full_detail) {
    console.log("from api" + full_detail);
  return this.http.post('http://localhost:8080/api/courses/addcourselesson', full_detail).map(res => res.json());
  }

  saveStudent(full_detail) {
    return this.http.post('http://localhost:8080/api/courses/addstudent', full_detail).map(res => res.json());
  }

  editCourse(editcourse) {
    return this.http.post('http://localhost:8080/api/courses/updateCourse', editcourse).map(res => res.json());
  } 

  updateLesson(uplessons) {
    return this.http.post('http://localhost:8080/api/courses/updateCourseLesson', uplessons).map(res => res.json());
  } 

  deleteCourse(deleteid){
    return this.http.get(`http://localhost:8080/api/courses/deleteCourse/${deleteid}`).map(res=>res.json());
  }  

  deleteLesson(deleteid){
    return this.http.post('http://localhost:8080/api/courses/deleteLesson', deleteid).map(res=>res.json());
  }  

  deleteStudent(deleteid){
    return this.http.post('http://localhost:8080/api/courses/deleteStudent', deleteid).map(res=>res.json());
  } 

  similarStudent(search) {
    return this.http.get('http://localhost:8080/api/courses/search/'+ search).map(res => res.json());
  }

  similarLessons(search) {
    return this.http.get('http://localhost:8080/api/courses/searchles/'+ search).map(res => res.json());
  }

  checkIfLessonExists(isLesson: boolean, isUsername: boolean, value: string) {
    return this.http.get(`http://localhost:8080/api/courses/checkIfLessonExists?isLesson=${isLesson}&value=${value}`).map(res => res.json());
  }  

private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  

}

