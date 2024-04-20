import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService {
    noEmptyFieldsValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.trim().length === 0) {
            return { emptyField: true };
        }
        return null;
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }
}
