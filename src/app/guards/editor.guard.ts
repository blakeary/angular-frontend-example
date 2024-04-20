import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function editorGuard() {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isEditor() || (router.navigate(['/unauthorized']), false);
}
