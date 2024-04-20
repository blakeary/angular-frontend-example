import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models/wiki/category';
import { Page } from '../models/wiki/page';
import { PagesByCategory } from '../models/wiki/pages-by-category';
import { CreatePageData } from '../models/wiki/create-page-data';
import { UpdatePageData } from '../models/wiki/update-page-data';

@Injectable({
    providedIn: 'root',
})
export class WikiService {
    private baseUrl = `${environment.apiBaseUrl}/api`;

    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<Category[]>(`${this.baseUrl}/get-categories`);
    }

    getPage(slug: string) {
        return this.http.get<Page>(`${this.baseUrl}/get-page/${slug}`);
    }

    getPagesByCategory(slug: string) {
        return this.http.get<PagesByCategory>(`${this.baseUrl}/get-pages-by-category/${slug}`);
    }

    searchCategories(searchTerm: string) {
        const params = new HttpParams().set('search', searchTerm);
        return this.http.get<Category[]>(`${this.baseUrl}/get-categories`, { params });
    }

    searchPages(searchTerm: string) {
        const params = new HttpParams().set('search', searchTerm);
        return this.http.get<Page[]>(`${this.baseUrl}/get-pages`, { params });
    }

    createPage(pageData: CreatePageData) {
        return this.http.post<Page>(`${this.baseUrl}/create-page`, pageData);
    }

    updatePage(slug: string, pageData: UpdatePageData) {
        return this.http.put<Page>(`${this.baseUrl}/update-page/${slug}`, pageData);
    }

    deletePage(slug: string) {
        return this.http.delete(`${this.baseUrl}/delete-page/${slug}`);
    }
}
