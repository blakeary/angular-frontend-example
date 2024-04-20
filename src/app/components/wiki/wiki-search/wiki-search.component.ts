import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/wiki/category';
import { Page } from '../../../models/wiki/page';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-search',
    templateUrl: './wiki-search.component.html',
    styleUrls: ['./wiki-search.component.css'],
})
export class WikiSearchComponent {
    searchQuery: string = '';
    searchResults: { categories: Category[]; pages: Page[] } = { categories: [], pages: [] };
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private wikiService: WikiService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.searchQuery = params['query'];
            this.performSearch();
        });
    }

    performSearch(): void {
        if (!this.searchQuery) return;

        this.isLoading = true;

        this.wikiService.searchCategories(this.searchQuery).subscribe({
            next: (categories) => {
                this.searchResults.categories = categories;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching categories:', error);
                this.isLoading = false;
            },
        });

        this.wikiService.searchPages(this.searchQuery).subscribe({
            next: (pages) => {
                this.searchResults.pages = pages;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching pages:', error);
                this.isLoading = false;
            },
        });
    }
    navigateToCategory(categorySlug: string): void {
        this.router.navigate(['/category', categorySlug]);
    }
}
