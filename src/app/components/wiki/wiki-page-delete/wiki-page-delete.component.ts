import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-page-delete',
    template: `
        <br />
        <div class="form-container">
            <h3>Are you sure you want to delete this page?</h3>
            <br />
            <button type="button" class="btn btn-outline-danger" (click)="deletePage()">Confirm</button>
            &nbsp;
            <button type="button" class="btn btn-outline-primary" (click)="cancel()">Cancel</button>
        </div>
        <br />
    `,
})
export class WikiPageDeleteComponent {
    private slug!: string;

    constructor(private route: ActivatedRoute, private router: Router, private wikiService: WikiService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.slug = params['pageSlug'];
        });
    }

    deletePage(): void {
        this.wikiService.deletePage(this.slug).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Error deleting page:', error);
            },
        });
    }

    cancel(): void {
        this.router.navigate(['/page', this.slug]);
    }
}
