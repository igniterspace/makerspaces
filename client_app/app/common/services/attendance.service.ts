import { Injectable }               from '@angular/core';
import { Headers, Http ,Response }  from '@angular/http';

// for data passing to other component
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class AttendanceService {

  private courses     = new BehaviorSubject <any>(null);
          newCourse   = this.courses.asObservable();

  private listStudents      = new BehaviorSubject <any>(null);
          newlistStudents   = this.listStudents.asObservable();

  private full_studentCourse = new BehaviorSubject <any>(null);
          newFull_studentCourse   = this.full_studentCourse.asObservable();

  private CourseID = new BehaviorSubject <any>(null);
          newCourseId   = this.CourseID.asObservable();


     constructor( private http: Http ) { }

    //Get all course years for select in front end
    getCourseYears(){
      return this.http.get('http://localhost:8080/api/attendance/getCoursesYears').map(res =>res.json());
    }

    // Get all search values from the front end and get result data back to front end from the search(used post because we are sending an object,not a single value)
    searchCourses(searchvalues){
      return this.http.post('http://localhost:8080/api/attendance/getCourses',searchvalues ).map(res =>res.json());
    }

    // Get selected student lesson attendance from database(used post because we are sending an object,not a single value)
    getStudentAttendance(details){
      return this.http.post('http://localhost:8080/api/attendance/getStudentAttendance', details ).map(res =>res.json());
    }

    // Get selected student course lessons from database(used post because we are sending an object)
    getStudentLessons(details){
      return this.http.post('http://localhost:8080/api/attendance/getStudentLessons', details ).map(res =>res.json());
    }

    // Get lessons belongs to required specific course
    getCourseLessons(course_id){
      return this.http.get('http://localhost:8080/api/attendance/getCourseLessons/'+ course_id ).map(res =>res.json());
    }

    //Get all students details in specific course
    getCourseStudents(course_id){
      return this.http.get('http://localhost:8080/api/attendance/getCourseStudents/'+ course_id ).map(res =>res.json());
    }

    getlessonsForCourse(courseId){
      return this.http.get('http://localhost:8080/api/attendance/getlessons/'+ courseId ).map(res =>res.json());
    }

    //pass course from student course page to view student page
    passCourse(course) {
      this.courses.next(course)
    }

    //pass array of students from student course page to view student page(via shared service method)
    passStudents(students) {
      this.listStudents.next(students)
    }

    //pass details( course + student) to view student attendance page
    passStudent_course(course_id) {
      this.full_studentCourse.next(course_id)
    }

    passCourseID(courseId) {
      this.CourseID.next(courseId)
    }
    
  }