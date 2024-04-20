import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../models/wiki/page';
import { AuthService } from '../../../services/auth.service';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-page',
    templateUrl: './wiki-page.component.html',
    styleUrls: ['./wiki-page.component.css'],
})
export class WikiPageComponent implements OnInit {
    page!: Page;

    constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService, private wikiService: WikiService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const pageSlug = params['pageSlug'];
            this.wikiService.getPage(pageSlug).subscribe({
                next: (data: Page) => {
                    this.page = data;
                },
                error: (error) => {
                    console.error('Error fetching page:', error);
                },
            });
        });
    }

    isUserEditor(): boolean {
        return this.authService.isEditor();
    }

    navigateToUpdatePage(slug: string): void {
        this.router.navigate(['/update-page', slug]);
    }

    navigateToDeletePage(slug: string): void {
        this.router.navigate(['/page-delete', slug]);
    }
}
