import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProjectRoutingModule } from './components/project/project-routing.module';
import { StudyRoutingModule } from './components/study/study-routing.module';
import { WikiRoutingModule } from './components/wiki/wiki-routing.module';

import { authGuard } from './guards/auth.guard';
import { editorGuard } from './guards/editor.guard';

const routes: Routes = [
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), AuthRoutingModule, ProjectRoutingModule, StudyRoutingModule, WikiRoutingModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
