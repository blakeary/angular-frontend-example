import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDetail } from '../../../models/auth/user-detail';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    userDetails: UserDetail | null = null;

    @ViewChild('fileInput') fileInput!: ElementRef;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUserDetails().subscribe({
            next: (data) => {
                this.userDetails = data;
            },
            error: (error) => {
                console.error('Error fetching user details:', error);
            },
            complete: () => {},
        });
    }

    navigateToUsernameChange(): void {
        this.router.navigate(['/username-change']);
    }

    navigateToEmailChange(): void {
        this.router.navigate(['/email-change']);
    }

    // Opens the file select dialog.
    onFileSelect(): void {
        this.fileInput.nativeElement.click();
    }

    // Generates a pre-signed URL for the file.
    uploadFile(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files ? fileInput.files[0] : null;
        if (!file) {
            console.error('No file selected');
            return;
        }

        const contentType = file.type; // Get the content type of the file
        this.authService.generatePresignedUrl(file.name, contentType).subscribe({
            next: (response) => {
                const url = response.url;
                this.uploadToS3(url, file, contentType); // Pass the contentType
            },
            error: (error) => console.error('Error generating presigned URL:', error),
        });
    }

    // Uploads the file to S3 using the pre-signed URL.
    private uploadToS3(presignedUrl: string, file: File, contentType: string): void {
        // Add contentType parameter
        this.authService.uploadProfilePicture(presignedUrl, file, contentType).subscribe({
            // Pass the contentType
            next: () => {
                console.log('File uploaded successfully');
                const newPictureUrl = presignedUrl.split('?')[0];
                this.updateProfilePicture(newPictureUrl);
            },
            error: (error) => console.error('Error uploading file:', error),
        });
    }

    // Updates the user's profile picture in the database.
    private updateProfilePicture(newPictureUrl: string): void {
        this.authService.updateProfilePicture(this.userDetails!.username, newPictureUrl).subscribe({
            next: () => {
                console.log('Profile picture updated successfully');
                this.userDetails!.profile_picture = newPictureUrl;
            },
            error: (error) => console.error('Error updating profile picture:', error),
        });
    }
}
