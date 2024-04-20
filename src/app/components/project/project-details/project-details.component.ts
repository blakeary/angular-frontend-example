import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NestedProject } from '../../../models/nested-project/nested-project';
import { ProjectService } from '../../../services/project.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
    project: NestedProject | null = null;
    projectId: string;

    constructor(private route: ActivatedRoute, private projectService: ProjectService) {
        this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    }

    ngOnInit(): void {
        this.projectService.getUserProject(this.projectId).subscribe({
            next: (project) => {
                this.project = project;
            },
            error: (error) => {
                console.error('Error fetching project details', error);
            },
            complete: () => {},
        });
    }
}
