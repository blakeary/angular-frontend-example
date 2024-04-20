import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/wiki/page';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-page-list',
    templateUrl: './wiki-page-list.component.html',
    styleUrls: ['./wiki-page-list.component.css'],
})
export class WikiPageListComponent implements OnInit {
    pages: Page[] = [];

    constructor(private route: ActivatedRoute, private wikiService: WikiService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const categorySlug = params.get('categorySlug');
            if (categorySlug) {
                this.wikiService.getPagesByCategory(categorySlug).subscribe((data) => {
                    this.pages = data.pages;
                });
            }
        });
    }
}
