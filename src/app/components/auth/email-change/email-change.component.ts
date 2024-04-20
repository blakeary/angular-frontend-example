import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-email-change',
    templateUrl: './email-change.component.html',
    styleUrls: ['./email-change.component.css'],
})
export class EmailChangeComponent {
    emailChangeForm: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(private router: Router, private authService: AuthService, private commonService: CommonService) {
        this.emailChangeForm = new FormGroup({
            newEmail: new FormControl('', [Validators.required]),
        });
    }

    onSubmit(): void {
        if (this.emailChangeForm.valid) {
            this.authService.requestEmailChange(this.emailChangeForm.value.newEmail).subscribe({
                next: () => {
                    this.successMessage = 'Email change request sent. Please check your new email to confirm.';
                    setTimeout(() => (this.successMessage = null), 5000);
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = this.commonService.handleHttpError(error);
                    setTimeout(() => (this.errorMessage = null), 5000);
                },
                complete: () => {},
            });
        }
    }
}
