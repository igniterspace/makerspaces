import { Component ,Input, Output, EventEmitter, ViewChild, OnInit}  from '@angular/core';
import { SelectModule }       from 'ng2-select';
import { ButtonsModule }      from 'ngx-bootstrap';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

// models
import { CourseDetails }      from '../../../common/models/courses';
import { Year }               from '../../../common/models/courses';
import { Students }           from '../../../common/models/attendance.model';
import { ListLesson }         from '../../../common/models/courses';

//services
import { AttendanceService }  from '../../../common/services/attendance.service';


@Component({
   templateUrl : './search.courses.page.html',
   styleUrls   : ['./search.courses.page.css']

 
})

export class SearchCoursesPage implements OnInit {
 

  private seachresultForm  : boolean = false; 
  private coursesYears     : any[] = new Array ;
  private select_level     : CourseDetails[] = new Array ;
  private select_day       : CourseDetails[] = new Array ;
  private courseDetails    : any[];
  private course           : any[];
  private course_years     : Year[];
  private students         : Students[];
  private lessons          : ListLesson[];
  searchCoursesForm        : FormGroup ;
  private course_id        : number;
  private courseId         : number;
  private courseForLesson  : any;

  constructor (private attService: AttendanceService)
  {
      this.searchCoursesForm  = new FormGroup
      ({
        level: new FormControl,
        year : new FormControl,
        day  : new FormControl,
     }); 
  }

// get all courses details to the multisearch dropdown
  getcourseyears() {
    this.attService.getCourseYears().subscribe(res => {

        this.coursesYears = res.item;

        this.select_level = [

          {"id": 1,   "itemName":"Level 1"},
          {"id": 2,   "itemName":"Level 2"},
          {"id": 3,   "itemName":"Level 3"},
          {"id": 4,   "itemName":"Level 4"},
          {"id": 5,   "itemName":"Level 5"}
        ];

        this.select_day = [

          {"id": 1,  "itemName":"Saturday"},
          {"id": 2,  "itemName":"Sunday"},
          {"id": 3,  "itemName":"Monday"},
          {"id": 4,  "itemName":"Tuesday"},
          {"id": 5,  "itemName":"Wednsday"},
          {"id": 6,  "itemName":"Thursday"},
          {"id": 7,  "itemName":"Friday"} 
        ];
      }); 
    }

      //show results of the search
      showSeachResultForm(){
        this.seachresultForm = true;
      }

      //get details of relating to the search strings
      searchCourses(searchvalues){     
            this.attService.searchCourses(searchvalues).subscribe(res => {
              this.courseDetails = res.item;
            });
          this.searchCoursesForm.reset();
      }

      // clear all fields in search bars
      clearfields(){
        this.searchCoursesForm.reset();
      }

      // get students registered to required specific course
      getCourseStudents( course: any) {
          this.course_id = course.id; 

           // For passing course details to view student page (shared service)
           this.attService.passCourse(course)
           this.attService.newCourse.subscribe( course=> this.course = course);

          // get students registered in to specified course 
          this.attService.getCourseStudents(this.course_id).subscribe(res => {
            this.students = res.item;
            console.log("students =", this.students);
          
          // For passing student details to view student page (shared service)
          this.attService.passStudents(this.students)
          this.attService.newlistStudents.subscribe( students => this.students = this.students);

        });
      }

        //pass clicked course Id to view lesson page
        passCourseForLessons(courseForLesson : any) {
          console.log("WTF =", courseForLesson);
          this.attService.passCourseID(courseForLesson)
          this.attService.newCourseDeatails.subscribe( cocourseForLessonurse => this.courseForLesson = courseForLesson);
          
        };
  


      ngOnInit() {
      this.getcourseyears(); 
      
    } 

}



