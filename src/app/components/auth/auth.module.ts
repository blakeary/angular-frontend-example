import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthRoutingModule } from './auth-routing.module';
import { EmailChangeComponent } from './email-change/email-change.component';
import { EmailChangeConfirmComponent } from './email-change-confirm/email-change-confirm.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsernameChangeComponent } from './username-change/username-change.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
    declarations: [EmailChangeComponent, EmailChangeConfirmComponent, ForgotPasswordComponent, LoginComponent, PasswordResetComponent, ProfileComponent, RegisterComponent, UsernameChangeComponent, VerifyEmailComponent],
    imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
})
export class AuthModule {}
