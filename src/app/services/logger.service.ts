import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogEntry } from '../models/log-entry';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    private baseUrl = `${environment.apiBaseUrl}/api`;

    constructor(private http: HttpClient) {}

    logToServer(logEntry: LogEntry): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/log`, logEntry);
    }
}
