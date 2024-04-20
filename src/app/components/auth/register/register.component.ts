import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/auth/user';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    registerForm: FormGroup;
    user: User = {
        username: '',
        email: '',
        password: '',
    };
    confirmPassword: string = '';
    successMessage: string | null = null;
    errorMessage: string | null = null;
    faShield = faShield;

    constructor(private router: Router, private authService: AuthService, private commonService: CommonService, private validatorService: ValidatorService) {
        this.registerForm = new FormGroup(
            {
                username: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required]),
                confirmPassword: new FormControl('', Validators.required),
            },
            { validators: this.validatorService.passwordMatchValidator }
        );
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            return;
        }

        const user = {
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
        };

        this.authService.register(user).subscribe({
            next: (response) => {
                this.successMessage = 'Registration successful! Please check your email to activate your account.';
                setTimeout(() => (this.successMessage = null), 10000);
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessage = this.commonService.handleHttpError(error);
                setTimeout(() => (this.errorMessage = null), 5000);
            },
        });
    }
}
