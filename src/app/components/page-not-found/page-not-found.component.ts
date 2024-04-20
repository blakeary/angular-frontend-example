import { Component } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template: `
        <div class="container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
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
export class PageNotFoundComponent {}
