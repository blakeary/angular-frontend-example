import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm: FormGroup;
    username: string = '';
    password: string = '';
    successMessage: string | null = null;
    errorMessage: string | null = null;
    faKey = faKey;

    constructor(private router: Router, private authService: AuthService, private commonService: CommonService) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username, password).subscribe({
                next: (data) => {
                    this.authService.setTokens(data.access, data.refresh);
                    this.router.navigate(['/']);
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
