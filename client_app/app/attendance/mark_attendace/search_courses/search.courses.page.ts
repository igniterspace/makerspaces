import { Component ,Input, Output, EventEmitter, ViewChild, OnInit}  from '@angular/core';
import { SelectModule }       from 'ng2-select';
import { ButtonsModule }      from 'ngx-bootstrap';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

// models
import { CourseDetails }      from '../../../common/models/courses';
import { Year }               from '../../../common/models/courses';
import { Students }           from '../../../common/models/attendance.model';
import { ListLesson }         from '../../../common/models/courses';
//import { CourseName }         from '../../../common/models/courses';

//services
import { AttendanceService }  from '../../../common/services/attendance.service';
import { ContextService }     from '../../../common/services/context.service';



@Component({
   templateUrl : './search.courses.page.html',
   styleUrls   : ['./search.courses.page.css']

 
})

export class SearchCoursesPage implements OnInit {
 

  private seachresultForm  : boolean = false; 
  private coursesYears     : any[] = new Array ;
  private select_level     : any[];
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
  private currentLocationId  : number;


  constructor (private attService: AttendanceService,
               private context   : ContextService )
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

      // get course names for select dropdown
      getCourseNames() {
        this.attService.getCourseNames().subscribe(res => {
          this.select_level = res.item;
        }); 
      }

      //show results of the search
      showSeachResultForm(){
        this.seachresultForm = true;
      }

      //get details of relating to the search strings
      searchCourses(searchvalues){     
        console.log(searchvalues);
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
          
          // For passing student details to view student page (shared service)
          this.attService.passStudents(this.students)
          this.attService.newlistStudents.subscribe( students => this.students = this.students);

        });
      }

        //pass clicked course Id to view lesson page
        passCourseForLessons(courseForLesson : any) {
          this.attService.passCourseID(courseForLesson)
          this.attService.newCourseDeatails.subscribe( cocourseForLessonurse => this.courseForLesson = courseForLesson);
          
        };
  


      ngOnInit() {
      this.getcourseyears(); 
      this.getCourseNames();

        //Get current location ID
      this.currentLocationId = this.context.getCurrentLocationId();
        var nowLocation = this.currentLocationId;
    } 

}



