import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/wiki/category';
import { Page } from '../../../models/wiki/page';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-page-update',
    templateUrl: './wiki-page-update.component.html',
    styleUrls: ['./wiki-page-update.component.css'],
})
export class WikiPageUpdateComponent implements OnInit {
    updatePageForm!: FormGroup;
    categories: Category[] = [];
    pageSlug!: string;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private wikiService: WikiService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.pageSlug = params.get('pageSlug')!;
            if (this.pageSlug) {
                this.wikiService.getPage(this.pageSlug).subscribe({
                    next: (page: Page) => {
                        this.updatePageForm.patchValue({
                            category: page.category,
                            title: page.title,
                            content: page.content,
                            is_published: page.is_published,
                        });
                    },
                    error: (error) => {
                        console.error('Error fetching page:', error);
                    },
                });
            }
        });

        this.updatePageForm = this.formBuilder.group({
            category: ['', Validators.required],
            title: ['', Validators.required],
            content: ['', Validators.required],
            is_published: [false, Validators.required],
        });

        this.wikiService.getCategories().subscribe((data) => {
            this.categories = data;
        });
    }

    onSubmit(): void {
        if (this.updatePageForm.valid) {
            this.wikiService.updatePage(this.pageSlug, this.updatePageForm.value).subscribe({
                next: (data) => {
                    console.log('Page updated:', data);
                    this.router.navigate(['/page', data.slug]);
                },
                error: (error) => {
                    console.error('Error updating page:', error);
                },
            });
        }
    }
}
