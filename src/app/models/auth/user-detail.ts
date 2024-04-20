export interface UserDetail {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture: string;
    is_active: boolean;
    last_login: Date | null;
    date_joined: Date;
    groups: string[];
}
