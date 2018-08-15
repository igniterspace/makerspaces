import { Injectable }    from '@angular/core';
import { User }          from '../models/user';
import { Browser }       from '../models/browser';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment }   from '../../../environments/environment';
import { AuthHttp }      from 'angular2-jwt';


@Injectable()
export class ContextService {
    private location: number;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.location = parseInt(window['locationId']);
    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getCurrentLocationId() {
        return this.location;
    }

    getPermittedLocations(): Promise<any> {
        let url = environment.apiUrl + '/api/locations/permitted';
        return this.authHttp.get(url)
            .toPromise()
            .then(response => {
                console.log(response.json().items);
                return response.json().items || {};
            })
            .catch(this.handleError);
    }

    getCurrentLocation(): any {
        let url = environment.apiUrl + '/api/locations/current';
        return this.authHttp.get(url)
            .toPromise()
            .then(response => {
                console.log(response.json().items);
                return response.json().items || {};
            })
            .catch(this.handleError);
    }

}