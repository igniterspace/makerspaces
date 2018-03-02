import { Component, OnInit }  from '@angular/core';
import { SelectModule }       from 'ng2-select';
import { ButtonsModule }      from 'ngx-bootstrap';
import { CourseDetails }        from '../../../common/models/courses';
import { AttendanceService }  from '../../../common/services/attendance.service';


@Component({
    templateUrl     : './search.student.page.html',
    styleUrls       : ['./search.student.page.css']

})

export class SearchStudentPage implements OnInit {

    
    constructor( private attService : AttendanceService){}

    private value :any = ['Athens'];
    private _disabledV:string = '0';
    private disabled:boolean = false;
    private active : Array <CourseDetails[]>;
    private item : any ;
    seachresultForm  : boolean = false;  
    private courses : any[] = new Array ;
    private c_length : number;
    private i : number;
    public select_items : CourseDetails[] = new Array ;
    
    private sss:Array<any> =  ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

    private items:Array<string> = this.sss;
  
    
    // private get disabledV():string {
    //   return this._disabledV;
    // }
  
    // private set disabledV(value:string) {
    //   this._disabledV = value;
    //   this.disabled = this._disabledV === '1';
    // }


    getcourses() {
      this.attService.getCourseYears().subscribe(res => {
        this.c_length = res.item.length;
        this.courses = res.item;
        console.log("courses are =",this.courses);
        
        for (var i = 0 ; i < this.c_length ; i++)
         {
          this.sss.push(this.courses[i].courses_year) ;
        }
       
        console.log(this.select_items);
  
        // var uniqueItems = Array.from(new Set(this.select_items));
        // console.log("unique" , uniqueItems);
  
          // for( var j = 0 ; j < this.select_items.length ; j++) {
  
          //   this.dropdownList.push("id",":",[j+1], "",":", this.select_items[j]);
  
          // }
      });
      
    }
  
    private selected(value:any) {
      console.log('Selected value is: ', value);
    }
  
    private removed(value:any) {
      console.log('Removed value is: ', value);
    }
  
    private refreshValue(value:any) {
      this.value = value;
    }


    // show results of the search
    showseachresultForm(){
      this.seachresultForm = true;
    }

    //get entered values of the search
    searchStudent(active){
        console.log(active);
        this.clearModel();
    
    }

    // clear search field
    clearModel() {
      this.active = [];
      this.item = [];
    }

    ngOnInit() {  
      this.getcourses();
      //this.sss.push( "2018" ) ;
      for (var j = 0 ; j < this.select_items.length ; j++)
      {
        console.log(this.select_items[j]);
       this.sss.push(this.select_items[j]) ;
     }
    
     console.log(this.sss);

    }

}

