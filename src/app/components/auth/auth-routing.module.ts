import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailChangeComponent } from './email-change/email-change.component';
import { EmailChangeConfirmComponent } from './email-change-confirm/email-change-confirm.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsernameChangeComponent } from './username-change/username-change.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { authGuard } from './../../guards/auth.guard';

const routes: Routes = [
    { path: 'email-change', component: EmailChangeComponent, canActivate: [authGuard] },
    { path: 'email-change-confirm', component: EmailChangeConfirmComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'username-change', component: UsernameChangeComponent, canActivate: [authGuard] },
    { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
