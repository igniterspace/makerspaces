import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error) {
        const router = this.injector.get(Router);
        if (error.rejection) {
            if (
                error.rejection.status === 401 ||
                error.rejection.status === 403 ||
                error.rejection.message === "No JWT present or has expired") {
                router.navigate(['/logout']);
            }
        }


        throw error;
    }
}