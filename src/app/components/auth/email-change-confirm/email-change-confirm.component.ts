import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-email-change-confirm',
    templateUrl: './email-change-confirm.component.html',
    styleUrls: ['./email-change-confirm.component.css'],
})
export class EmailChangeConfirmComponent implements OnInit {
    uid: string = '';
    token: string = '';
    message: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.uid = params['uid'];
            this.token = params['token'];
            this.confirmEmailChange();
        });
    }

    confirmEmailChange(): void {
        this.authService.confirmEmailChange(this.uid, this.token).subscribe({
            next: (response) => {
                this.message = 'Your email has been successfully updated.';
                setTimeout(() => this.router.navigate(['/login']), 5000);
            },
            error: (error) => {
                this.message = 'Failed to update email. Please try again.';
            },
        });
    }
}
