import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function authGuard() {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn() || (router.navigate(['/login']), false);
}
