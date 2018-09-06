import { Injectable }      from '@angular/core';
import { Headers, Http, Response }   from '@angular/http';
import { AuthHttp }        from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { ContextService }  from './context.service';
import { environment }     from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';


@Injectable()
export class PaymentsService {
  authService : any ;
  options : any;


  private headers = new Headers({'Content-Type': 'application/json'});
  private studentsUrl;  // URL to web api

  public sPay  = new BehaviorSubject<any>(null);
  selectpayment = this.sPay.asObservable();

  constructor(private http: Http, private context: ContextService, private authHttp: AuthHttp) { 
    let locationId = this.context.getCurrentLocation().id;
    this.studentsUrl = environment.apiUrl + '/api/location/' + locationId + '/students' ;
  }
 
  selpay(paymentdet) {
    this.sPay.next(paymentdet)
  }


  getAuthService(params): Observable<any> {
    return this.http.get(`${this.authService}${params}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error Authentication Service'));
  }

  savePayment(full_detail) {
    return this.http.post('http://localhost:8080/api/payments/addPayment', full_detail).map(res => res.json());
  }

  similarPayStudents(search) {
    return this.http.get('http://localhost:8080/api/payments/search/'+ search).map(res => res.json());
  }

  getpayments(ids){
    return this.http.post('http://localhost:8080/api/payments/getallpayments' , ids).map(res=>res.json());
  }

  gettotalpayment(ids){
    return this.http.post('http://localhost:8080/api/payments/gettotalpayments' , ids).map(res=>res.json());
  }

private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
  
}

