import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { authGuard } from './../../guards/auth.guard';

const routes: Routes = [
    { path: 'projects', component: ProjectListComponent, canActivate: [authGuard] },
    { path: 'project/:projectId', component: ProjectDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}
