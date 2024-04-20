import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/auth/user';
import { PresignedUrl } from '../models/auth/presigned-url';
import { UserDetail } from '../models/auth/user-detail';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = `${environment.apiBaseUrl}/auth`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/token`, { username, password });
    }

    setTokens(access: string, refresh: string): void {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    }

    isTokenExpired(): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) return true;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        const now = new Date();
        return decoded.exp < now.getTime() / 1000;
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('accessToken');
    }

    isEditor(): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) return false;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.groups && decoded.groups.includes('Editor');
    }

    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http.post(`${this.baseUrl}/token/refresh`, { refresh: refreshToken });
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    getUserIdFromToken(): number | null {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.user_id || null;
        }
        return null;
    }

    register(user: User): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, user);
    }

    verifyEmail(uid: string, token: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/verify-email`, { params: { uid, token } });
    }

    requestPasswordReset(email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/password-reset`, { email });
    }

    confirmPasswordReset(uid: string, token: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/password-reset/confirm`, { uid, token, password });
    }

    usernameChange(newUsername: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/username-change`, { new_username: newUsername });
    }

    requestEmailChange(newEmail: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/email-change`, { new_email: newEmail });
    }

    confirmEmailChange(uid: string, token: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/email-change/confirm`, { params: { uid, token } });
    }

    getUserDetails(): Observable<UserDetail> {
        return this.http.get<UserDetail>(`${this.baseUrl}/get-user-details`);
    }

    generatePresignedUrl(fileName: string, contentType: string) {
        return this.http.get<PresignedUrl>(`${this.baseUrl}/generate-presigned-url`, {
            params: {
                filename: fileName,
                contenttype: contentType,
            },
        });
    }

    uploadProfilePicture(presignedUrl: string, file: File, contentType: string) {
        let headers = new HttpHeaders({
            'Content-Type': contentType,
        });
        headers = headers.delete('Authorization');

        return this.http.put(presignedUrl, file, {
            headers: headers,
            withCredentials: false,
        });
    }

    updateProfilePicture(username: string, newPictureUrl: string) {
        const body = { profile_picture: newPictureUrl };
        return this.http.patch(`${this.baseUrl}/update-profile-picture/${username}`, body);
    }
}
