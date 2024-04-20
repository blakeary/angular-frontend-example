import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { TokenInterceptor } from './../../interceptors/auth.interceptor';
import { TruncatePipe } from './../../pipes/truncate.pipe';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiCategoryListComponent } from './wiki-category-list/wiki-category-list.component';
import { WikiPageListComponent } from './wiki-page-list/wiki-page-list.component';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { WikiSearchComponent } from './wiki-search/wiki-search.component';
import { WikiPageCreateComponent } from './wiki-page-create/wiki-page-create.component';
import { WikiPageUpdateComponent } from './wiki-page-update/wiki-page-update.component';

@NgModule({
    declarations: [TruncatePipe, WikiCategoryListComponent, WikiPageListComponent, WikiPageComponent, WikiSearchComponent, WikiPageCreateComponent, WikiPageUpdateComponent],
    imports: [BrowserModule, ReactiveFormsModule, MarkdownModule.forRoot(), WikiRoutingModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class WikiModule {}
