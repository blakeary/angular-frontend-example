import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../models/wiki/category';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-category-list',
    templateUrl: './wiki-category-list.component.html',
    styleUrls: ['./wiki-category-list.component.css'],
})
export class WikiCategoryListComponent implements OnInit {
    categories: Category[] = [];

    constructor(private wikiService: WikiService, private router: Router) {}

    ngOnInit() {
        this.wikiService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    navigateToCategory(categorySlug: string) {
        this.router.navigate(['/category', categorySlug]);
    }
}
