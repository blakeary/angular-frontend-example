import { Page } from './page';

export interface PagesByCategory {
    id: number;
    name: string;
    title: string;
    slug: string;
    pages: Page[];
}
