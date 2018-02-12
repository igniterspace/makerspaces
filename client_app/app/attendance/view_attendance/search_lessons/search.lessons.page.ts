import { Component, ChangeDetectionStrategy, OnInit }   from '@angular/core';
import { Observable }           from 'rxjs/Observable';
import { AttendanceService }    from '../../../common/services/attendance.service';


@Component({
    changeDetection : ChangeDetectionStrategy.OnPush,
    templateUrl     : './search.lessons.page.html',
    styleUrls       : ['./search.lessons.page.css']

})

export class ViewLessonsPage implements OnInit {

    people$1: Observable<any[]>;
    selectedPeople1 = [];
    
    constructor( private attService : AttendanceService){}

    

    ngOnInit() {  
        this.people$1 = this.attService.getPeople();     
    }

    clearModel() {
        this.selectedPeople1 = [];
    }

}

// https://ng-select.github.io/ng-select#/multiselect
// https://www.npmjs.com/package/@ng-select/ng-select#getting-started
// https://github.com/ng-select/ng-select/blob/master/demo/app/examples/multi.component.ts
// https://ng-select.github.io/ng-select#/templates