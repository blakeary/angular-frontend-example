import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-verify-email-confirm',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
    uid: string = '';
    token: string = '';
    message: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.uid = params['uid'];
            this.token = params['token'];
            this.verifyRegistration();
        });
    }

    verifyRegistration(): void {
        this.authService.verifyEmail(this.uid, this.token).subscribe({
            next: (response) => {
                this.message = 'Your email has been successfully verified. Redirecting to login in 5 seconds...';
                setTimeout(() => this.router.navigate(['/login']), 5000);
            },
            error: (error) => {
                this.message = 'Failed to verify email. Please try again.';
            },
        });
    }
}
