import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenInterceptor } from './../../interceptors/auth.interceptor';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
    declarations: [ProjectListComponent, ProjectDetailsComponent],
    imports: [CommonModule, ProjectRoutingModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class ProjectModule {}
