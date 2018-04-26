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

  private full_studentCourse    = new BehaviorSubject <any>(null);
          newFull_studentCourse = this.full_studentCourse.asObservable();

  private course = new BehaviorSubject <any>(null);
          newCourseDeatails = this.course.asObservable();

  private details = new BehaviorSubject <any>(null);
          newFull_lesson_detail = this.details.asObservable();


     constructor( private http: Http ) { }

    //Get all course years for select in front end
    getCourseYears(){
      return this.http.get('http://localhost:8080/api/attendance/getCoursesYears').map(res =>res.json());
    }

    //Get all course names for select in front end
    getCourseNames(){
      return this.http.get('http://localhost:8080/api/attendance/getCourseNames').map(res =>res.json());
    }

    // Get all search values from the front end and get result data back to front end from the search(used post because we are sending an object,not a single value)
    searchCourses(searchvalues){
      return this.http.post('http://localhost:8080/api/attendance/getCourses',searchvalues ).map(res =>res.json());
    }

    //Get course students belongs to peticular lesson from database
    getCourseLessonAttendance(passfull_lesson_detail){
      return this.http.post('http://localhost:8080/api/attendance/getLessonAttendance', passfull_lesson_detail ).map(res =>res.json());
    }

    //get lesson details belongs to selcted specific course
    getCourseLessonDetails(passfull_lesson_detail){
      return this.http.post('http://localhost:8080/api/attendance/getCourseLessonDetails', passfull_lesson_detail ).map(res =>res.json());
    }

    //get students similar to seach keyword
    searchCourseStudents(search){
      return this.http.get('http://localhost:8080/api/attendance/searchCourseStudents/'+ search ).map(res =>res.json());
    }

    // Get selected student course lessons and attendance from database(used post because we are sending an object)
    getStudentLessons(details){
      return this.http.post('http://localhost:8080/api/attendance/getStudentLessons', details ).map(res =>res.json());
    }

    //Mark student as present
    markStudentAttendance(attStudent){
      return this.http.post('http://localhost:8080/api/attendance/markStudentAttendance', attStudent ).map(res =>res.json());
    }

     //edit student as not present
     editAttendance(attStudent){
      return this.http.post('http://localhost:8080/api/attendance/editAttendance', attStudent ).map(res =>res.json());
    }

    //Mark student as present
    markStudentLessonAttendance(attStudent){
      return this.http.post('http://localhost:8080/api/attendance/markStudentLessonAttendance', attStudent ).map(res =>res.json());
    }

    //edit student as not present
    editlessonAttendance(attStudent){
      return this.http.post('http://localhost:8080/api/attendance/editlessonAttendance', attStudent ).map(res =>res.json());
    }

    // get student lesson attendance 
    getLessonAttendanceDetails(student_course){
      return this.http.post('http://localhost:8080/api/attendance/getLessonAttendanceDetails', student_course ).map(res =>res.json());
    }

    // Get lessons belongs to required specific course
    
    getCourseLessons(course_id){
      return this.http.get('http://localhost:8080/api/attendance/getCourseLessons/'+ course_id ).map(res =>res.json());
    }

    //Get all students details in specific course
    getCourseStudents(course_id){
      return this.http.get('http://localhost:8080/api/attendance/getCourseStudents/'+ course_id ).map(res =>res.json());
    }

    //pass course from student course page to view student page(via shared service method)
    passCourse(course) {
      this.courses.next(course)
    }

    //pass array of students from student course page to view student page(via shared service method)
    passStudents(students) {
      this.listStudents.next(students)
    }

    //pass details( course + student) to view student attendance page(via shared service method)
    passStudent_course(course_id) {
      this.full_studentCourse.next(course_id)
    }

    //Pass course details to view lessons page(via shared service method)
    passCourseID(courseForLesson) {
      this.course.next(courseForLesson)
    }

    //pass course ID and lesson ID to lesson attendance page
    passFull_lesson_detail(full_lesson_detail) {
      this.details.next(full_lesson_detail)
    }
    
  }