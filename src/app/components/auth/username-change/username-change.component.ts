import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-username-change',
    templateUrl: './username-change.component.html',
    styleUrls: ['./username-change.component.css'],
})
export class UsernameChangeComponent {
    usernameChangeForm: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(private router: Router, private authService: AuthService, private commonService: CommonService) {
        this.usernameChangeForm = new FormGroup({
            newUsername: new FormControl('', [Validators.required]),
        });
    }

    onSubmit(): void {
        if (this.usernameChangeForm.valid) {
            this.authService.usernameChange(this.usernameChangeForm.value.newUsername).subscribe({
                next: () => {
                    this.successMessage = 'Username successfully changed. Redirecting to profile page...';
                    setTimeout(() => {
                        this.router.navigate(['/profile']);
                    }, 5000);
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = this.commonService.handleHttpError(error);
                    setTimeout(() => (this.errorMessage = null), 5000);
                },
            });
        }
    }
}
