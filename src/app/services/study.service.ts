import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Option } from '../models/study/option';
import { Question } from '../models/study/question';

@Injectable({
    providedIn: 'root',
})
export class StudyService {
    private baseUrl = `${environment.apiBaseUrl}/study`;

    constructor(private http: HttpClient) {}

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.baseUrl + '/get-questions');
    }

    getQuestion(questionId?: string): Observable<Question> {
        const url = questionId ? `${this.baseUrl}/get-question/${questionId}` : `${this.baseUrl}/get-question`;
        return this.http.get<Question>(url);
    }
}
