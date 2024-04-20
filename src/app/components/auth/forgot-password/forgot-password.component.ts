import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(private authService: AuthService, private commonService: CommonService) {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    onSubmit(): void {
        if (this.forgotPasswordForm.valid) {
            this.authService.requestPasswordReset(this.forgotPasswordForm.value.email).subscribe({
                next: () => {
                    this.successMessage = 'Password reset link sent. Please check your email.';
                    setTimeout(() => (this.successMessage = null), 5000);
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = this.commonService.handleHttpError(error);
                    setTimeout(() => (this.errorMessage = null), 5000);
                },
            });
        }
    }
}
