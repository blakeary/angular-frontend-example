import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Register
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Login
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Logout
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Profile
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Create Page
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'; // Study
import { faList } from '@fortawesome/free-solid-svg-icons'; // Projects (future)

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    searchQuery: string = '';

    // Fontawesome icons
    faUserPlus = faUserPlus; // Register
    faSignInAlt = faSignInAlt; // Login
    faSignOutAlt = faSignOutAlt; // Logout
    faUser = faUser; // Profile
    faPlus = faPlus; // Create Page
    faGraduationCap = faGraduationCap; // Study
    faList = faList; // Projects

    constructor(private router: Router, public authService: AuthService) {}

    isUserEditor(): boolean {
        return this.authService.isEditor();
    }

    performSearch(query: string): void {
        if (!query) return;
        this.router.navigate(['/search', query]);
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
