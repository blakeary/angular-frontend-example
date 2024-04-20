import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NestedProject } from '../models/nested-project/nested-project';
import { Project } from '../models/project/project';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl = `${environment.apiBaseUrl}/project`;

    constructor(private http: HttpClient) {}

    getUserProjects(): Observable<NestedProject[]> {
        return this.http.get<NestedProject[]>(this.baseUrl + '/user-projects');
    }

    getUserProject(projectId: string): Observable<NestedProject> {
        return this.http.get<NestedProject>(this.baseUrl + '/user-project/' + projectId);
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.baseUrl + '/get-projects');
    }
}
