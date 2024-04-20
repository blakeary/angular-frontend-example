import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../models/wiki/category';
import { AuthService } from '../../../services/auth.service';
import { WikiService } from '../../../services/wiki.service';

@Component({
    selector: 'app-wiki-page-create',
    templateUrl: './wiki-page-create.component.html',
    styleUrls: ['./wiki-page-create.component.css'],
})
export class WikiPageCreateComponent implements OnInit {
    createPageForm!: FormGroup;
    categories: Category[] = [];

    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private wikiService: WikiService) {}

    ngOnInit(): void {
        this.createPageForm = this.formBuilder.group({
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
        if (this.createPageForm.valid) {
            const pageData = {
                ...this.createPageForm.value,
                published_by: this.authService.getUserIdFromToken(),
            };

            this.wikiService.createPage(pageData).subscribe({
                next: (data) => {
                    console.log('Page created:', data);
                    this.router.navigate(['/page', data.slug]);
                },
                error: (error) => {
                    console.error('Error creating page:', error);
                },
            });
        }
    }
}
