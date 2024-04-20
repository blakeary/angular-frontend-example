import { NestedActivity } from './nested-activity';

export interface NestedWorkPackage {
    id: string;
    name: string;
    description: string;
    activities: NestedActivity[];
}
