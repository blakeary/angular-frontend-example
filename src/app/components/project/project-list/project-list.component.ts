import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project/project';
import { ProjectService } from '../../../services/project.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    constructor(private projectService: ProjectService) {}

    ngOnInit(): void {
        this.projectService.getProjects().subscribe({
            next: (projects) => {
                this.projects = projects;
            },
            error: (error) => {
                console.error('Error fetching projects', error);
            },
            complete: () => {},
        });
    }
}
