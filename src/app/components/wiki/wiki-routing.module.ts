import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WikiCategoryListComponent } from './wiki-category-list/wiki-category-list.component';
import { WikiPageListComponent } from './wiki-page-list/wiki-page-list.component';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { WikiSearchComponent } from './wiki-search/wiki-search.component';
import { WikiPageCreateComponent } from './wiki-page-create/wiki-page-create.component';
import { WikiPageUpdateComponent } from './wiki-page-update/wiki-page-update.component';
import { WikiPageDeleteComponent } from './wiki-page-delete/wiki-page-delete.component';

import { editorGuard } from './../../guards/editor.guard';

const routes: Routes = [
    { path: '', component: WikiCategoryListComponent },
    { path: 'category/:categorySlug', component: WikiPageListComponent },
    { path: 'page/:pageSlug', component: WikiPageComponent },
    { path: 'search/:query', component: WikiSearchComponent },
    { path: 'create-page', component: WikiPageCreateComponent, canActivate: [editorGuard] },
    { path: 'update-page/:pageSlug', component: WikiPageUpdateComponent, canActivate: [editorGuard] },
    { path: 'page-delete/:pageSlug', component: WikiPageDeleteComponent, canActivate: [editorGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WikiRoutingModule {}
