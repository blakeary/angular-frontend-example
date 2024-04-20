import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
    passwordResetForm: FormGroup;
    uid: string = '';
    token: string = '';
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private commonService: CommonService) {
        this.passwordResetForm = new FormGroup({
            newPassword: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.uid = params['uid'];
            this.token = params['token'];
        });
    }

    onSubmit(): void {
        if (this.passwordResetForm.invalid) {
            return;
        }

        const newPassword = this.passwordResetForm.value.newPassword;
        const confirmPassword = this.passwordResetForm.value.confirmPassword;

        if (newPassword !== confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }

        this.authService.confirmPasswordReset(this.uid, this.token, newPassword).subscribe({
            next: () => {
                this.successMessage = 'Password reset successful. You can now log in with your new password.';
                setTimeout(() => this.router.navigate(['/login']), 5000);
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = this.commonService.handleHttpError(error);
                setTimeout(() => (this.errorMessage = null), 5000);
            },
        });
    }
}
