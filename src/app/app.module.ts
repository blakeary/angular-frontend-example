import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectModule } from './components/project/project.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { StudyModule } from './components/study/study.module';
import { WikiModule } from './components/wiki/wiki.module';

@NgModule({
    declarations: [AppComponent, NavbarComponent, PageNotFoundComponent, UnauthorizedComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, FontAwesomeModule, AppRoutingModule, AuthModule, ProjectModule, StudyModule, WikiModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
