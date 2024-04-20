import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor() {}

    handleHttpError(error: HttpErrorResponse): string {
        if (error.error) {
            if (typeof error.error === 'object') {
                let fieldErrors = [];
                for (const key in error.error) {
                    if (error.error[key] instanceof Array) {
                        fieldErrors.push(...error.error[key]);
                    } else if (typeof error.error[key] === 'string') {
                        fieldErrors.push(error.error[key]);
                    }
                }
                if (fieldErrors.length > 0) {
                    return fieldErrors.join(' ');
                }
            }
            if (error.error.message) {
                return error.error.message;
            }
        }
        return 'An unexpected error occurred.';
    }
}
