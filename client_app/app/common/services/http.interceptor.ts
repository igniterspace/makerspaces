import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
export class HttpHeaderInterceptor implements HttpInterceptor {

    private locationId;

    constructor() {
        this.locationId = parseInt(window['locationId'])
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            // Clone the request to add the new header
            const clonedRequest = req.clone({ headers: req.headers.set('IG_LOCATION', this.locationId) });

            // Pass the cloned request instead of the original request to the next handle
            return next.handle(clonedRequest);
        } catch (err) {
            console.log(err);
        }

    }
}