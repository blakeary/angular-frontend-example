import { NestedDeliverable } from './nested-deliverable';

export interface NestedProject {
    id: string;
    name: string;
    description: string;
    deliverables: NestedDeliverable[];
    created_at: Date;
    updated_at: Date;
}
