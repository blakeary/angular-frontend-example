import { Component } from '@angular/core';

@Component({
    selector: 'app-unauthorized',
    template: `
        <div class="container">
            <h1>Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <a routerLink="/">Go to Home</a>
        </div>
    `,
    styles: [
        `
            .container {
                text-align: center;
                margin-top: 50px;
            }
        `,
    ],
})
export class UnauthorizedComponent {}
