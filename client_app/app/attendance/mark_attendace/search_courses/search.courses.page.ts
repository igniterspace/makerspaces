import { Component , OnInit}  from '@angular/core';
import { SelectModule }       from 'ng2-select';
import { ButtonsModule }      from 'ngx-bootstrap';
import { Selected }           from '../../../common/models/attendance.model';

@Component({
   templateUrl : './search.courses.page.html',
   styleUrls   : ['./search.courses.page.css']

 
})

export class SearchCoursesPage {

    private value :any = ['Athens'];
    private _disabledV:string = '0';
    private disabled:boolean = false;
    private active : Array <Selected[]>;
    private item : any ;
    seachresultForm  : boolean = false; 
    
    private items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
      'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
      'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
      'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
      'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
      'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
      'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
      'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
      'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];
  
    private get disabledV():string {
      return this._disabledV;
    }
  
    private set disabledV(value:string) {
      this._disabledV = value;
      this.disabled = this._disabledV === '1';
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
  
    private itemsToString(value:Array<any> = []) {
      return value
        .map(item => {
        return item.text;
        
      }).join(',');
    }

    // show results of the search
    showseachresultForm(){
      this.seachresultForm = true;
    }

    //get entered values of the search
    searchLessons(active){
        console.log(active);

        this.clearModel();
    
    }

    // clear search field
    clearModel() {
      this.active = [];
      this.item = [];
    }


    // cities = [
    //     {id: 1, name: 'Vilnius'},
    //     {id: 2, name: 'Kaunas'},
    //     {id: 3, name: 'Pabradė'}
    // ];
    // selectedCityId: any;
}

